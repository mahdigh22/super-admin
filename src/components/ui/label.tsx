import * as LabelPrimitive from '@radix-ui/react-label';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils/class-names';

type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

type LabelRef = ElementRef<typeof LabelPrimitive.Root>;

const Label = forwardRef<LabelRef, LabelProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <LabelPrimitive.Root
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
