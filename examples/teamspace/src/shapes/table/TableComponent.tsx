import { HTMLContainer, TLShapeUtil } from '@tldraw/core';

import { TableShape } from '..';
import React from 'react';

import { ShapeErrorBoundary } from 'shapes/ShapeErrorBoundary';
import equal from 'fast-deep-equal';
import { useSnapshot } from 'valtio';
import { useSpaceState } from '../../hooks/useSpaceContext';
import { AutosizeableShape } from '../textcard/AutosizeableShape';
import { TableCard } from './TableCard';
import { TableTarget } from 'state/constants';

export const TableComponent = React.memo(
  TLShapeUtil.Component<TableShape, HTMLDivElement>(function TableComponent(props, ref) {
    const { store, currentSpace } = useSpaceState();

    const { items } = useSnapshot(currentSpace);
    const item = items[props.shape.id];
    const data = useSnapshot(store);
    if (!item || item.type !== 'table') {
      return <></>;
    }

    const target: TableTarget = { type: 'table', id: item.docId };

    const isLoaded = !data.cards[item.docId].docIsLoading;

    return isLoaded ? (
      <ShapeErrorBoundary description="Something went wrong and this card could not be shown.">
        <HTMLContainer data-testid="CardComponent" ref={ref} {...props.events}>
          <AutosizeableShape
            hasSize={props.hasSize}
            shape={props.shape}
            isDragging={props.isDragging}
            isEditing={props.isEditing}
            isResizing={props.isResizing}
            shouldFillHeight={false}
            shouldFillWidth={false}
            constraints={['growHeight', 'growWidth', 'shrinkHeight', 'shrinkWidth']}
          >
            <TableCard
              cardData={data.cards[item.docId]}
              target={target}
              editable={props.isEditing}
              isEditing={props.isEditing}
              isDragging={props.isDragging}
            />
          </AutosizeableShape>
        </HTMLContainer>
      </ShapeErrorBoundary>
    ) : (
      <></>
    );
  }),
  equal
);
