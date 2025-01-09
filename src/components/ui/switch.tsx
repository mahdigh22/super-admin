import * as SwitchPrimitives from '@radix-ui/react-switch';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils/class-names';


type SwitchRef = ElementRef<typeof SwitchPrimitives.Root> & {
  thumbProps?: ThumbProps;
};

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

type ThumbProps = ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>;

const Switch = forwardRef<SwitchRef, SwitchProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className
      )}
      {...rest}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
