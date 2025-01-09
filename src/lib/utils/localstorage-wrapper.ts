import { AuthInfo } from 'common/models/auth';
import { getObjectKeys } from '~/lib/utils/ts-utils';

type LocalStorageMap = {
  theme: 'light' | 'dark';
  authInfo: AuthInfo;
  test: string;
};

type LocalStorageType = Storage & LocalStorageMap;

class LocalStorage {
  private _localStorage = window.localStorage as LocalStorageType;

  setItem<TKey extends keyof LocalStorageMap, TValue extends LocalStorageType[TKey]>(key: TKey, value: TValue) {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<TKey extends keyof LocalStorageMap, TValue extends LocalStorageType[TKey]>(key: TKey) {
    const value = this._localStorage.getItem(key);
    return value ? (JSON.parse(value) as TValue) : null;
  }

  removeItem<TKey extends keyof LocalStorageMap>(key: TKey) {
    this._localStorage.removeItem(key);
  }

  clear() {
    this._localStorage.clear();
  }

  getAll<TKey extends keyof LocalStorageMap>() {
    return getObjectKeys(this._localStorage).reduce((acc, key) => {
      const value = this.getItem(key as TKey);
      if (value) {
        acc[key as TKey] = value;
      }
      return acc;
    }, {} as LocalStorageMap);
  }
}

const localStorage = new LocalStorage();

export { localStorage };
