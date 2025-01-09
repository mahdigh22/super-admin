import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { Label } from './label';
import { cn } from '../../lib/utils/class-names';

type InputVariant = 'outlined' | 'underlined' | 'filled';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> & {
  variant?: InputVariant;
  append?: ReactNode;
  prepend?: ReactNode;
  label?: ReactNode;
  inputClassName?: string;
};

const BASE_ICON_CLASS_NAME = 'flex items-center justify-center h-full w-[40px] opacity-50';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variant = 'outlined', className, inputClassName, id: idProp, prepend, append, label, ...rest } = props;

  const variantClassName = {
    outlined: 'rounded-md border border-input bg-background',
    underlined: 'border-b border-input',
    filled: 'bg-muted rounded-md',
  }[variant];

  const internalId = useId();
  const id = idProp || internalId;

  return (
    <div className="flex flex-col gap-3 w-full">
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <div
        className={cn(
          'group flex items-center h-10',
          'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-3',
          variantClassName,
          className
        )}
      >
        {!!prepend && <div className={BASE_ICON_CLASS_NAME}>{prepend}</div>}
        <input
          className={cn(
            'flex-1 py-2 px-2 text-sm placeholder:text-muted-foreground bg-transparent',
            'focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            inputClassName
          )}
          ref={ref}
          {...rest}
        />
        {!!append && <div className={BASE_ICON_CLASS_NAME}>{append}</div>}
      </div>
    </div>
  );
});
Input.displayName = 'Input';

export { type InputProps, Input };
