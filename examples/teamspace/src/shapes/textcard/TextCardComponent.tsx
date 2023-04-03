import { HTMLContainer, TLShapeUtil } from '@tldraw/core';

import { CardShape } from '..';
import React from 'react';

import { ShapeErrorBoundary } from 'shapes/ShapeErrorBoundary';
import equal from 'fast-deep-equal';
import { useSnapshot } from 'valtio';
import { useSpaceState } from 'hooks/useSpaceContext';
import { AutosizeableShape } from './AutosizeableShape';
import { TextCard } from './TextCard';
import { COLUMN_WIDTH, TextCardTarget } from 'state/constants';
import { cardThemes } from 'styles/stitches.config';

export const TextCardDefaultSize = [COLUMN_WIDTH * 22, 121];

export const TextCardComponent = React.memo(
  TLShapeUtil.Component<CardShape, HTMLDivElement>(function TextCardComponent(props, ref) {
    const { store, currentSpace } = useSpaceState();

    const { items, undoManager } = useSnapshot(currentSpace);
    const item = items[props.shape.id];
    const data = useSnapshot(store);
    if (!item || item.type !== 'card') {
      return <></>;
    }

    const target: TextCardTarget = { type: 'card', id: item.docId };

    // @todo move this check to a higher level
    const { docIsLoading } = data.cards[item.docId];

    return !docIsLoading ? (
      <ShapeErrorBoundary description="Something went wrong and this card could not be shown.">
        <HTMLContainer data-testid="TextCardComponent" ref={ref} {...props.events}>
          <AutosizeableShape
            shape={props.shape}
            hasSize={props.hasSize}
            isDragging={props.isDragging}
            isEditing={props.isEditing}
            isResizing={props.isResizing}
            width={TextCardDefaultSize[0]}
            shouldFillHeight={false}
            shouldFillWidth={false}
            constraints={['growHeight', 'growWidth', 'shrinkHeight', 'shrinkWidth']}
          >
            <TextCard
              className={item.color ? cardThemes[item.color] : cardThemes.sand}
              target={target}
              editable={props.isEditing}
              isEditing={props.isEditing}
              isDragging={props.isDragging}
              isRounded={true}
              isSmall={false}
              fullHeight={false}
              undoManager={undoManager}
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
