import { cn } from '../../lib/utils/class-names';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Loader2Icon } from 'lucide-react';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost' | 'none';
export type ButtonColor = 'primary' | 'danger' | 'secondary' | 'accent';

type ClassBuilder = string;
type ClassBuilderObject = Record<ButtonColor, ClassBuilder>;

const CLASS_BUILDERS_MAP: Partial<Record<ButtonVariant, Partial<ClassBuilderObject>>> = {
  filled: {
    primary: cn(
      'bg-primary text-primary-foreground',
      'hover:bg-primary/85 hover:text-primary-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-primary active:shadow-none'
    ),
    danger: cn(
      'bg-danger text-danger-foreground rounded-md',
      'hover:bg-danger/85 hover:text-danger-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-danger active:shadow-none'
    ),
    secondary: cn(
      'bg-secondary/65 text-secondary-foreground rounded-md',
      'hover:bg-secondary hover:text-secondary-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-secondary active:shadow-none'
    ),
    accent: cn(
      'bg-accent text-accent-foreground rounded-md',
      'hover:bg-accent/85 hover:text-accent-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-accent active:shadow-none active:text-accent-foreground'
    ),
  },
  outlined: {
    primary: cn(
      'border border-primary text-primary rounded-md',
      'hover:bg-primary hover:text-primary-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-primary/85 active:border-primary/85 active:text-primary-foreground focus:shadow-none'
    ),
    danger: cn(
      'border border-danger text-danger rounded-md',
      'hover:bg-danger hover:text-danger-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-danger/85 active:shadow-none'
    ),
    secondary: cn(
      'border border-secondary-foreground text-secondary-foreground rounded-md',
      'hover:bg-secondary-foreground hover:text-secondary',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-secondary-foreground/85 active:text-secondary active:shadow-none',
      'disabled:text-disabled disabled:no-underline'
    ),
    accent: cn(
      'border border-accent-foreground text-accent-foreground rounded-md',
      'hover:bg-accent-foreground hover:text-accent',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'active:bg-accent-foreground/85 active:text-accent active:shadow-none'
    ),
  },
  text: {
    primary: cn(
      'text-primary border-b border-transparent',
      'hover:border-primary/85',
      'focus-visible:border-primary/85',
      'active:border-primary',
      'disabled:text-disabled disabled:no-underline'
    ),
    danger: cn(
      'text-danger',
      'hover:border-danger/85',
      'focus-visible:border-danger/85',
      'active:border-danger',
      'disabled:text-disabled disabled:no-underline'
    ),
    secondary: cn(
      'text-secondary-foreground',
      'hover:border-secondary/85',
      'focus-visible:border-secondary/85',
      'active:border-secondary',
      'disabled:text-disabled disabled:no-underline'
    ),
    accent: cn(
      'text-accent-foreground',
      'hover:border-accent/85',
      'focus-visible:border-accent/85',
      'active:border-accent',
      'disabled:text-disabled disabled:no-underline'
    ),
  },
  ghost: {
    accent: cn(
      'text-accent-foreground',
      'border border-transparent',
      'hover:bg-accent',
      'focus-visible:bg-accent focus-visible:text-accent-foreground',
      'active:text-accent-foreground/85',
      'disabled:text-disabled disabled:no-underline'
    ),
    primary: cn(
      'text-primary',
      'border border-transparent',
      'hover:bg-primary/10',
      'focus-visible:bg-accent focus-visible:text-accent-foreground',
      'active:text-primary/85',
      'disabled:text-disabled disabled:no-underline'
    ),
    danger: cn(
      'text-danger',
      'border border-transparent',
      'hover:bg-danger/10',
      'active:text-danger/85',
      'disabled:text-disabled disabled:no-underline'
    ),
    secondary: cn(
      'text-secondary-foreground',
      'border border-transparent',
      'hover:bg-secondary/85',
      'disabled:text-disabled disabled:no-underline'
    ),
  },
} as const;

type VariantColorCombo =
  | { variant?: 'none'; color?: undefined }
  | { variant?: 'filled' | 'outlined' | 'text' | 'ghost'; color?: 'primary' | 'danger' | 'secondary' | 'accent' };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  isLoading?: boolean;
  fillSpace?: boolean;
} & VariantColorCombo;

type ButtonClassBuilderProps = Pick<ButtonProps, 'variant' | 'color' | 'fillSpace' | 'isLoading' | 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const {
    variant = 'filled',
    color: colorProp,
    asChild = false,
    fillSpace = false,
    isLoading = false,
    type = 'button',
    className,
    children,
    ...rest
  } = props;

  const Component = asChild ? Slot : 'button';

  const btnClass = buildButtonClass({ variant, color: colorProp, fillSpace, isLoading, className });

  return (
    <Component className={btnClass} type={type} ref={ref} {...rest}>
      <>
        {isLoading && <Loader2Icon className="h-4 w-4 animate-spin loading-icon" />}
        {children}
      </>
    </Component>
  );
});
Button.displayName = 'Button';

function buildButtonClass(props: ButtonClassBuilderProps) {
  const { variant = 'filled', color: colorProp, fillSpace = false, isLoading = false, className } = props;

  const isLoadingAnimationVisible = isLoading && variant !== 'text' && variant !== 'none';

  const color = colorProp ?? (variant === 'ghost' ? 'accent' : 'primary');

  const variantClassName = variant !== 'none' ? CLASS_BUILDERS_MAP[variant]?.[color] : undefined;

  return cn(
    'flex items-center justify-center gap-1 whitespace-nowrap transition-all outline-none',
    '[&>.loading-icon]:pointer-events-none [&>.loading-icon]:size-4 [&>.loading-icon]:shrink-0',
    'disabled:pointer-events-none  disabled:opacity-50',
    'text-[14px] font-semibold capitalize',
    variant !== 'text' && variant !== 'none' && 'min-h-[32px] rounded-md px-[15px] py-1',
    isLoadingAnimationVisible && 'animate-button-loading bg-[length:200%_100%]',
    isLoading && 'pointer-events-none',
    variantClassName,
    fillSpace && 'size-full rounded-none p-0',
    className
  );
}

export { type ButtonProps, Button, type ButtonClassBuilderProps, buildButtonClass };
