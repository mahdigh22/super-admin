import {
  forwardRef,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/utils/class-names';
import { composeCompoundComponent } from '../../lib/utils/components';

type TableProps = HTMLAttributes<HTMLTableElement>;

type TableHeadProps = HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean };

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;

type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

const TableRoot = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('relative w-full caption-bottom text-sm border-separate border-spacing-0', className)}
    {...props}
  />
));
TableRoot.displayName = 'Table';

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(({ className, sticky, ...props }, ref) => {
  const [isSticky, setIsSticky] = useState(false);

  const internalRef = useRef<HTMLTableSectionElement>(null);
  useImperativeHandle(ref, () => internalRef.current as HTMLTableSectionElement);

  useEffect(() => {
    if (!sticky) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { root: null, threshold: 1 }
    );

    const element = internalRef?.current as HTMLElement | null;
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [sticky, ref]);

  return (
    <thead
      ref={internalRef}
      className={cn(
        'table w-full',
        // TODO: The `pe-4` should be conditioned on whether there is a scrollbar or not
        // currently we have `overflow-y-scroll` on the `TableBody` which always shows the scrollbar
        // it should be changed to `overflow-auto` and the `pe-4` should be conditionally added
        '[&_tr_th]:border-b first:[&_th]:ps-4 last:[&_th]:pe-4 pe-4',
        isSticky &&
          '[&_tr]:bg-muted hover:[&_tr]:bg-muted [&_tr]:sticky [&_tr]:top-0 [&_tr]:shadow-md [&_tr]:transition-all [&_tr]:duration-200',
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = 'TableHead';

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      'block overflow-y-scroll [&>tr]:table [&>tr]:w-full [&>tr]:table-fixed [&>tr:last-child>td]:border-b-0',
      className
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0 ', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted first:[&>td]:ps-4 last:[&>td]:pe-4',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHeader = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 text-left pe-2 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'border-b align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-table-foreground pe-2',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const Table = composeCompoundComponent(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
});

export {
  Table,
  type TableProps,
  type TableHeadProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableCellProps,
  type TableCaptionProps,
};
