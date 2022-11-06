import { useEffect } from 'react';
import { PopoverThread, usePopoverThread } from '@collabkit/react';
import { nanoid } from 'nanoid';
import { DocDemoContainer } from '../Doc';

const cellId = nanoid();

type Car = { id: string; make: string; model: string; price: number };
type Column = { name: string; key: keyof Car; format: (value: any) => string };

const rows: Car[] = [
  { id: 'a6', make: 'Audi', model: 'A6', price: 52738 },
  { id: '116i', make: 'BMW', model: '116i', price: 29770 },
  { id: 'aveo', make: 'Chevrolet', model: 'Aveo', price: 15897 },
  { id: 'c5', make: 'Citroën', model: 'C5', price: 21513 },
  { id: 'focus', make: 'Ford', model: 'Focus', price: 26791 },
];
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

type CellProps = { value: number | string; row: Car; column: Column };

const ThreadIndicator = () => <span className="ThreadIndicator" />;

const Cell = ({ value, row, column }: CellProps) => {
  const name = `Cars / ${row.make} ${row.model}`;
  const cellId = `${row.id}_${column.key}`;
  const { hasThread, openPopover, showPreview, open, preview } = usePopoverThread({
    objectId: cellId,
  });

  const classes = [];
  if (hasThread) classes.push('hasThread');
  if (preview) classes.push('previewOpen');
  if (open) classes.push('threadOpen');

  return (
    <PopoverThread objectId={cellId}>
      <td
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '4px',
          color: 'black',
          cursor: 'pointer',
        }}
        className={classes.join(' ')}
        onClick={() => {
          if (hasThread) {
            showPreview();
          } else {
            openPopover();
          }
        }}
      >
        {value}
        {hasThread && <ThreadIndicator />}
      </td>
    </PopoverThread>
  );
};

export function PopoverThreadDemo() {
  const { openPopover } = usePopoverThread({
    objectId: cellId,
  });

  useEffect(() => {
    openPopover();
  }, []);

  return (
    <DocDemoContainer style={{ padding: '20px' }}>
      <div
        style={{
          width: '100%',
          backgroundSize: 'cover',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'left',
                  color: 'black',
                }}
              >
                Make
              </th>
              <th
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'left',
                  color: 'black',
                }}
              >
                Model
              </th>
              <th
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'left',
                  color: 'black',
                }}
              >
                Price
              </th>
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
      </div>
    </DocDemoContainer>
  );
}
