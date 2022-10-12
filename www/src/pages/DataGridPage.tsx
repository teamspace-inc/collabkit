import { DataGridDemo } from '../components/DataGridDemo';

export function DataGridPage() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#FFEE78',
        paddingBlock: '140px',
        paddingInline: '16px',
        boxSizing: 'border-box',
      }}
    >
      <DataGridDemo />
    </div>
  );
}
