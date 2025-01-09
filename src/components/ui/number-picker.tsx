import { forwardRef, useState } from 'react';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { Input, InputProps } from './input';
import { Button } from './button';
import { cn } from '../../lib/utils/class-names';

type NumberPickerVariant = 'filled' | 'outlined';

type NumberPickerProps = Omit<InputProps, 'variant' | 'onChange' | 'value'> & {
  className?: string;
  variant?: NumberPickerVariant;
  defaultValue?: number;
  onChange?: (value: number) => void;
  step?: number;
  max: number;
  min: number;
  value?: number;
};

const NumberPicker = forwardRef<HTMLInputElement, NumberPickerProps>((props, ref) => {
  const {
    onChange,
    className,
    defaultValue = Math.max(props.min, 0),
    step = 1,
    max,
    min,
    variant = 'outlined',
    ...rest
  } = props;

  const [value, setValue] = useState<number>(defaultValue);

  function handleIncrement() {
    const newValue = Math.min(value + step, max);
    setValue(newValue);
    onChange?.(newValue);
  }

  function handleDecrement() {
    const newValue = Math.max(value - step, min);
    setValue(newValue);
    onChange?.(newValue);
  }

  function handleChange(value: string) {
    const newValue = !Number.isInteger(step) ? parseFloat(value) : parseInt(value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange?.(newValue);
    } else if (!value) {
      setValue(min);
      onChange?.(min);
    }
  }

  const variantClassName = {
    outlined: 'border border-primary',
    filled: 'border border-secondary bg-card',
  }[variant];

  return (
    <div className={cn('flex items-center justify-between h-9 w-fit gap-2', className)}>
      <Button
        variant="ghost"
        color="primary"
        className={cn('size-8', variantClassName)}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="decrement"
      >
        <MinusIcon className="max-w-[12px]" />
      </Button>
      <Input
        variant="outlined"
        inputClassName="text-center w-12 bg-transparent outline-none"
        ref={ref}
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(e) => handleChange(e.target.value)}
        className={cn('text-center text-primary w-12 rounded-md')}
        {...rest}
      />
      <Button
        variant="ghost"
        color="primary"
        className={cn('size-8', variantClassName)}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="decrement"
      >
        <PlusIcon className="max-w-[12px]" />
      </Button>
    </div>
  );
});

NumberPicker.displayName = 'NumberPicker';

export { NumberPicker };
