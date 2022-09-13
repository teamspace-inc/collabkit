import { useState } from 'react';
import { usePopoverThread, PopoverTrigger, Inbox, InboxButton, SidePane } from '@collabkit/react';
import { MenuItem, ControlledMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

type CellProps = { value: number | string; row: Car; column: Column };

const Cell = ({ value, row, column }: CellProps) => {
  const name = `Cars / ${row.make} ${row.model}`;
  const cellId = `${row.id}_${column.key}`;
  const { hasThread, popoverState, setPopoverState, context } = usePopoverThread({
    name,
    cellId,
  });

  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const classes = [];
  if (hasThread) classes.push('hasThread');
  if (popoverState === 'preview') classes.push('previewOpen');
  if (popoverState === 'open') classes.push('threadOpen');

  return (
    <PopoverTrigger context={context}>
      <td
        className={classes.join(' ')}
        onContextMenu={(e) => {
          e.preventDefault();
          setAnchorPoint({ x: e.clientX, y: e.clientY });
          toggleMenu(true);
        }}
        onClick={() => {
          if (hasThread) {
            setPopoverState('open');
          }
        }}
      >
        {value}
        {hasThread && <ThreadIndicator />}

        <ControlledMenu {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(false)}>
          <MenuItem onClick={() => setPopoverState('open')}>Comment</MenuItem>
        </ControlledMenu>
      </td>
    </PopoverTrigger>
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

export const TableExample = () => {
  return (
    <div>
      <div style={{ display: 'flex', flex: 1, padding: '20px 20px', flexDirection: 'column' }}>
        <h1 style={{ margin: 0 }}>Table</h1>
        <p>Right click a table cell and click comment.</p>
      </div>

      <div style={{ display: 'flex', position: 'fixed', top: 20, right: 20 }}>
        <InboxButton />
      </div>

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
      <SidePane>
        <Inbox />
      </SidePane>
    </div>
  );
};
