import React from 'react';
import * as CollabKit from '..';
import CalendarExample from '../__fixtures__/CalendarExample';
import DataTableExample, { DataTableExampleArgs } from '../__fixtures__/DataTableExample';
import EnergySankeyExample from '../__fixtures__/EnergySankeyExample';
import PlotExample from '../__fixtures__/PlotExample';

export const DataTable = (props: any) => (
  <CollabKit.Commentable>
    <DataTableExample {...props} />
    <CollabKit.FloatingButton />
  </CollabKit.Commentable>
);
DataTable.args = DataTableExampleArgs;

export const Calendar = () => (
  <CollabKit.Commentable>
    <CalendarExample />
    <CollabKit.FloatingButton />
  </CollabKit.Commentable>
);

export const EnergySankey = () => (
  <CollabKit.Commentable>
    <EnergySankeyExample />
    <CollabKit.FloatingButton />
  </CollabKit.Commentable>
);

export const Plot = () => (
  <CollabKit.Commentable>
    <PlotExample />
    <CollabKit.FloatingButton />
  </CollabKit.Commentable>
);
