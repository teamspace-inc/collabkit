import { usePopoverThread, PopoverPortal } from '@collabkit/react';

type CellProps = { value: number | string; row: Car; column: Column };

const Cell = ({ value, row, column }: CellProps) => {
  const name = `Cars / ${row.make} ${row.model}} `;
  const viewId = 'cars';
  const cellId = `${row.id}_${column.key}`;
  const { popover, getProps, ref, hasThread, isOpen } = usePopoverThread({ name, viewId, cellId });

  const classes = [];
  if (hasThread) classes.push('hasThread');
  if (isOpen) classes.push('popoverOpen');

  return (
    <>
      <td {...getProps({ ref, className: classes.join(' ') })}>
        {value}
        {hasThread ? <ThreadIndicator /> : null}
      </td>
      <PopoverPortal popover={popover} />
    </>
  );
};

const ThreadIndicator = () => <span className="ThreadIndicator" />;

type Car = { id: string; make: string; model: string; price: number };
type Column = { name: string; key: keyof Car; format: (value: any) => string };
const columns: Column[] = [
  {
    key: 'make',
    name: 'Make',
    format: (value: string) => value,
  },
  {
    key: 'model',
    name: 'Model',
    format: (value: string) => value,
  },
  {
    key: 'price',
    name: 'Retail price',
    format: (value: number) =>
      value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
];
const rows: Car[] = [
  { id: 'a6', make: 'Audi', model: 'A6', price: 52738 },
  { id: '116i', make: 'BMW', model: '116i', price: 29770 },
  { id: 'aveo', make: 'Chevrolet', model: 'Aveo', price: 15897 },
  { id: 'c5', make: 'Citroën', model: 'C5', price: 21513 },
  { id: 'focus', make: 'Ford', model: 'Focus', price: 26791 },
  { id: 'i40', make: 'Hyundai', model: 'i40', price: 31959 },
  { id: 'rio', make: 'Kia', model: 'Rio', price: 16990 },
  { id: 'ct', make: 'Lexus', model: 'CT', price: 38586 },
  { id: 'mazda5', make: 'Mazda', model: '5', price: 30595 },
  { id: 'b180', make: 'Mercedes-Benz', model: 'B 180', price: 30721 },
  { id: 'micra', make: 'Nissan', model: 'Micra', price: 16240 },
  { id: 'beetle', make: 'Volkswagen', model: 'Beetle', price: 21193 },
];

export const TableExample = () => (
  <table className="TableExample">
    <thead>
      <tr>
        <th>Make</th>
        <th>Model</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <Cell
              key={column.key}
              value={column.format(row[column.key])}
              row={row}
              column={column}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
