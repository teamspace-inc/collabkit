import { useState } from 'react';
import { AgGridReact as OrigAgGridReact } from 'ag-grid-react';
import { TableCell } from '@collabkit/react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ICellRendererParams } from 'ag-grid-community';

const AgGridReact = OrigAgGridReact as any;

export function GridExample() {
  const [rowData] = useState([
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
  ]);

  const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model', cellRenderer },
    { field: 'price', cellRenderer },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ width: 650, height: 400 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}

function cellRenderer(props: ICellRendererParams) {
  const name = `Cars / ${props.data.make} ${props.data.model}`;
  const cellId = `${props.data.id}_${props.column!.getColId()}`;
  return (
    <TableCell name={name} viewId="cars" cellId={cellId}>
      <span>{props.value}</span>
    </TableCell>
  );
}
