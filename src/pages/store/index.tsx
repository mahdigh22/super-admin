import { Table } from '../../components/ui/table';

export default function StorePage() {
  const invoices = [
    { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
    { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
  ];

  return (
    <Table>
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Head sticky>
        <Table.Row>
          <Table.Header>Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header >Methods</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body className='overflow-y-hidden'>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice} className='h-10'>
            <Table.Cell>{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={11}>Total</Table.Cell>
          <Table.Cell className="text-right">$750.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
