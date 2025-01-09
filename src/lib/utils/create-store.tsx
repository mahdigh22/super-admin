/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * This code is copied from - and is fully documented on - https://github.com/ghamadi/react-nimble-store.
 * The name is terrible, but the package provides a simple and highly efficient state management solution for React applications.
 *
 * The main advantage this has over libraries like Zustand is that one store instance can spawn multiple Provider instances,
 * allowing for separate state "buckets" of the same type.
 */

import {
  createContext,
  type ReactNode,
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

type StoreContextValue<T> = {
  getState: () => T;
  subscribe: (callback: () => void) => () => void;
};

export type StateBuilder<T> = (setState: StateSetter<T>, getState: () => T) => T;
export type StateSetter<T> = (arg: StateSetterArg<T>) => void;
type StateSetterArg<T> = ((state: T) => Partial<T>) | Partial<T>;
export type Middleware<T> = (setState: StateSetter<T>, getState: () => T) => StateSetter<T>;

type Selector<T, R> = (state: T) => R;
type Predicate<T> = (arg1: T, arg2: T) => boolean;

type ProviderProps<T> = {
  children: ReactNode;
  value?: StateBuilder<T>;
};

/**
 * Creates a Store object for managing state in a React application.
 *
 * The returned `Store` exposes a `Provider` component — a wrapper for `Context.Provider`, and
 * consuming hooks setup to efficiently trigger the consumer components' re-rendering where needed only.
 *
 * @param stateBuilder - The callback used to setup the store
 * @returns A `Store` object
 */
export function createStore<U = never, T extends U = U>(
  stateBuilder: StateBuilder<T>,
  middleware?: Middleware<T>
) {
  const Context = createContext<StoreContextValue<T> | undefined>(undefined);
  const subscribers = new Set<() => void>([]);

  const Provider = (props: ProviderProps<T>) => {
    // Returns the current version of the state
    const getState = useCallback(() => stateRef.current, []);

    // Used by `useSelector` to pass a callback that triggers a state change in the hook
    const subscribe = useCallback((callback: () => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }, []);

    // The callback used by `actions` to trigger a state change
    const baseSetState: StateSetter<T> = useCallback((input) => {
      switch (typeof input) {
        case 'function':
          stateRef.current = { ...stateRef.current, ...input(stateRef.current) };
          break;
        case 'object':
          stateRef.current = { ...stateRef.current, ...input };
          break;
        default:
          stateRef.current = input;
      }
      subscribers.forEach((callback) => callback());
    }, []);

    // The final state setter
    const setState: StateSetter<T> = useCallback(
      (input) => {
        const finalSetState = middleware ? middleware(baseSetState, getState) : baseSetState;
        return finalSetState(input);
      },
      [baseSetState, getState]
    );

    const { value } = props;

    const state: T = useMemo<T>(() => {
      return (value ?? stateBuilder)(setState, getState);
    }, [value, setState, getState]);

    const stateRef = useRef(state);
    // Reinitialize stateRef iff the initial state changes
    useEffect(() => {
      stateRef.current = state;
    }, [state]);

    const contextValue: StoreContextValue<T> = useMemo(() => ({ getState, subscribe }), [getState, subscribe]);

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
  };

  /**
   * Hook to return any value from the store's `state` object. The output can be any data of any type.
   *
   * @param selector  - A callback to return data from the store
   * @param predicate - An equality checker callback to provider custom comparison logic when "===" is not enough
   * @returns data from the `state` of the closest parent provider
   */
  function useStore<R = T>(selector?: Selector<T, R>, predicate?: Predicate<R>) {
    const contextValue = useValidContext('useStore');

    const predicateFn = usePredicate(predicate);
    const selectorFn = useStoreSelector(selector);

    const { getState, subscribe } = contextValue;
    const [selectedState, setSelectedState] = useState(() => selectorFn(getState()));

    useEffect(() => {
      return subscribe(() => {
        const newValue = selectorFn(getState());
        if (!predicateFn(newValue, selectedState)) {
          setSelectedState(newValue);
        }
      });
    }, [predicateFn, getState, selectedState, selectorFn, subscribe]);

    return selectedState;
  }

  function useSubscribe<R>(selector?: Selector<T, R>, predicate?: Predicate<R>) {
    const contextValue = useValidContext('useSubscribe');

    const predicateFn = usePredicate(predicate);
    const selectorFn = useStoreSelector(selector);

    const { getState, subscribe } = contextValue;
    const selectionRef = useRef<R>();
    selectionRef.current = selectorFn(getState());

    return useCallback(
      (cb: (val: R) => void) => {
        return subscribe(() => {
          const newValue = selectorFn(getState());
          if (!predicateFn(newValue, selectionRef.current as R)) {
            selectionRef.current = newValue;
            cb(newValue);
          }
        });
      },
      [getState, predicateFn, selectorFn, subscribe]
    );
  }

  /**
   * @returns a function to read the store's current state without subscribing to changes in the store
   */
  function useGetState() {
    const contextValue = useValidContext('useGetState');
    return contextValue.getState;
  }

  /**
   * An internal hook to return a selector function
   * @returns a selector callback that returns part or all of the store's state
   */
  function useStoreSelector<R>(selector?: Selector<T, R>) {
    // Returns the entire state object if `selector` is undefined
    const selectorFn: Selector<T, R> = useCallback(
      (state) => (selector ? selector(state) : (state as unknown as R)),
      [selector]
    );

    return selectorFn;
  }

  /**
   * An internal hook to return a predicate function
   * @returns a predicate callback that returns the output of the predicate argument if defined, or performs a strict equality check
   */
  function usePredicate<R>(predicate?: Predicate<R>) {
    // Defaults to "===" if `predicate` is undefined.
    const predicateFn: Predicate<R> = useCallback(
      (arg1, arg2) => (predicate ? predicate(arg1, arg2) : arg1 === arg2),
      [predicate]
    );

    return predicateFn;
  }

  /**
   * An internal hook to get and validate the provided context value
   * @param callerName - the name of the hook calling useValidContext
   * @returns the output of useContextValue if defined. Throws an error otherwise.
   */
  function useValidContext(callerName: string) {
    const contextValue = useContext(Context);
    if (!contextValue) {
      throw new Error(`${callerName} must be used within a Store.Provider`);
    }
    return contextValue;
  }

  return { Provider, useStore, useGetState, useSubscribe };
}

export function compose<T>(...fns: Array<Middleware<T>>): Middleware<T> {
  return (setState, getState) => {
    const chain = fns.map((middleware) => middleware(setState, getState));
    return (input) => chain.forEach((stateSetter) => stateSetter(input));
  };
}
