import { TLBounds, TLBoundsHandle, TLBoundsWithCenter, TLCamera, Utils } from '@tldraw/core';
import { FileStoreDB } from 'file-store';
import { Table } from './constants';

/*
This file contains the "mutable" part of our application's state.
The information in the `mutables` object is modified and relied 
on by certain actions but does not need to be part of our React 
state, so we can throw it all into a regular object.
*/

interface Mutables {
  viewport: TLBounds;
  fileStoreDB?: FileStoreDB;
  initialPoint: number[];
  pointedBoundsHandleId?: TLBoundsHandle;
  rendererBounds: TLBounds;
  animateCameraTimeoutId?: number;
  pointId?: number;
  brushHits?: string[];
  cameras: Record<string, TLCamera>;
  snapInfo?: {
    initialBounds: TLBoundsWithCenter;
    all: TLBoundsWithCenter[];
    others: TLBoundsWithCenter[];
  };
  table?: Table;
  tableCellHeights: Record<string, Record<string, number>>; // rowId -> columnId -> height
  tableColumnNewIndex?: number;
  tableRowNewIndex?: number;
}

export const mutables: Mutables = {
  initialPoint: [0, 0],
  fileStoreDB: undefined,
  viewport: Utils.getBoundsFromPoints([
    [0, 0],
    [100, 100],
  ]),
  animateCameraTimeoutId: undefined,
  cameras: {},
  brushHits: undefined,
  pointId: undefined,
  pointedBoundsHandleId: undefined,
  snapInfo: undefined,
  rendererBounds: Utils.getBoundsFromPoints([
    [0, 0],
    [100, 100],
  ]),
  table: undefined,
  tableCellHeights: {},
  tableColumnNewIndex: undefined,
};
