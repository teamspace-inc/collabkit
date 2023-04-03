import type { TLShape } from '@tldraw/core';

import { ArrowUtil } from './arrow';
import { BoxUtil } from './box';
import { CardUtil } from './textcard';
import { ImageUtil } from './image';
import { StickyUtil } from './sticky';
import { TableUtil } from './table';
import { TextUtil } from './text';

export interface ArrowShape extends TLShape {
  type: 'arrow';
  start: Exclude<Shape, ArrowShape>;
  end: Exclude<Shape, ArrowShape>;
}

export interface BoxShape extends TLShape {
  type: 'box';
  size: number[];
}

export interface TextShape extends TLShape {
  type: 'text';
  size: number[];
}

export interface CardShape extends TLShape {
  type: 'card';
  size: number[];
}

export interface TableShape extends TLShape {
  type: 'table';
  size: number[];
}

export interface StickyShape extends TLShape {
  type: 'sticky';
  size: number[];
}

export interface ImageShape extends TLShape {
  type: 'image';
  size: number[];
}

export type Shape =
  | ArrowShape
  | BoxShape
  | CardShape
  | ImageShape
  | StickyShape
  | TextShape
  | TableShape;

export type ShapeWithSize = Exclude<Shape, ArrowShape>;

export const shapeUtils = {
  arrow: new ArrowUtil(),
  box: new BoxUtil(),
  text: new TextUtil(),
  sticky: new StickyUtil(),
  image: new ImageUtil(),
  card: new CardUtil(),
  table: new TableUtil(),
};

export function getShapeUtils<T extends Shape>(shape: Pick<T, 'type'> | T['type']) {
  if (typeof shape === 'string') return shapeUtils[shape];
  return shapeUtils[shape.type];
}

export function getBounds(shape: Shape) {
  const type = shape.type;
  if (type === 'arrow') {
    return shapeUtils.arrow.getBounds(shape);
  } else {
    return shapeUtils[type].getBounds(shape);
  }
}
