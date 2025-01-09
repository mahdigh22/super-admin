import { forwardRef, HTMLAttributes } from 'react';
import { composeCompoundComponent } from '../../lib/utils/components';
import { cn } from '../../lib/utils/class-names';

const CardRoot = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      ref={ref}
      {...rest}
    />
  );
});
CardRoot.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...rest} />;
});
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...rest}>
      {children}
    </h3>
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => {
  const { className, ...rest } = props;
  return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...rest} />;
});
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...rest} />;
});
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...rest} />;
});
CardFooter.displayName = 'CardFooter';

const Card = composeCompoundComponent(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export { Card };
