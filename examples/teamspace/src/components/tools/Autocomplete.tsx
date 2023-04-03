import { useSnapshot } from 'valtio';
import { styled } from '@stitches/react';

import { AutocompleteStore, COLUMN_WIDTH, SelectableTarget, Z } from 'state/constants';
import { getHighlights } from 'utils/getHighlights';
import { useAppContext } from 'hooks/useAppContext';
import { targetEqual } from 'state/helpers';
import { inputs, TLPointerInfo } from '@tldraw/core';
import { useAppEvents } from '../../events';
import React, { forwardRef, memo, useEffect, useLayoutEffect, useRef } from 'react';
import { intersectionStyles, useIntersectionObserver } from 'hooks/useIntersectionObserver';
import equal from 'fast-deep-equal';
import { useEditorContext } from 'hooks/useEditorContext';

const AUTOCOMPLETE_LIST_ITEM_WIDTH = COLUMN_WIDTH * 14;

const Hideable = styled('div', {
  variants: {
    isHidden: {
      true: {
        opacity: 0,
      },
    },
  },
});

const AutocompleteList = styled(
  'div',
  {
    margin: '0px',
    textAlign: 'left',
    borderRadius: '$radii$1',
    background: '$ui$background',
    zIndex: Z.__OVERRIDE,
    flexShrink: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifySelf: 'flex-start',
    overflow: 'hidden',
    pointerEvents: 'all',
    padding: '$space$0',
    width: AUTOCOMPLETE_LIST_ITEM_WIDTH,
    boxShadow: '$shadows$2',
    maxHeight: '222px',
  },
  intersectionStyles
);

const AutocompleteSectionTitle = styled('div', {
  fontSize: '$fontSizes$tiny',
  height: '$size$5',
  display: 'flex',
  alignItems: 'center',
  lineHeight: '$lineHeights$tiny',
  textIndent: 4,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '$ui$tertiaryText',
  padding: '0 $space$1',
  fontWeight: 500,
});

const AutocompleteNoListItems = styled('div', {
  display: 'flex',
  padding: '$space$3 $space$1 $space$3',
  textIndent: 4,
  fontSize: '$fontSizes$3',
  height: '$space$2',
  alignItems: 'center',
  textAlign: 'left',
  lineHeight: '22px',
  color: '$ui$tertiaryText',
});

const AutocompleteListItem = styled('div', {
  fontSize: '14px',
  padding: '0px $space$0',
  minWidth: '110px',
  borderRadius: '$radii$0',
  display: 'flex',
  alignItems: 'center',
  height: '$space$4',
  textIndent: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: AUTOCOMPLETE_LIST_ITEM_WIDTH,
  color: '$ui$text',
  variants: {
    isSelected: {
      true: {
        color: '$ui$selectionText',
        background: '$ui$selection',
      },
    },
  },
});

const StyledScrollListItem = styled('div', {
  padding: '0px $space$0',
  cursor: 'pointer',
  variants: {
    disablePointerEvents: {
      true: {
        pointerEvents: 'none',
      },
    },
    isSelected: {
      true: {
        borderRadius: '$radii$0',
        background: '$ui$selection',
      },
    },
  },
});

const ScrollListItem = forwardRef(function ScrollListItem(
  props: {
    children: React.ReactNode;
    target: SelectableTarget;
    isSelected: boolean;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const editorContext = useEditorContext();
  const { onPointerDown, onPointerEnter } = useAppEvents();
  return (
    <StyledScrollListItem
      ref={ref}
      onPointerEnter={(e) => {
        onPointerEnter(inputs.pointerEnter(e, props.target), e);
      }}
      onPointerDown={(e) => onPointerDown(inputs.pointerDown(e, props.target), e, editorContext)}
      key={props.target.id}
      isSelected={props.isSelected}
    >
      {props.children}
    </StyledScrollListItem>
  );
});

function clampTitleWithEllipsis(title: string, maxWidth: number) {
  if (title.length > maxWidth) {
    return title.slice(0, maxWidth - 3) + '...';
  } else {
    return title;
  }
}

export const Autocomplete = memo(function Autocomplete(props: {
  autocomplete: AutocompleteStore;
  onScrollList: (info: TLPointerInfo<{ type: 'wheel' }>, e: React.WheelEvent) => void;
}) {
  const data = useSnapshot(props.autocomplete);
  const { onScrollList } = props;

  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);
  const { indexedItems } = useSnapshot(useAppContext().store.search);

  const intersection = useIntersectionObserver(scrollRef, [data.point]);

  useLayoutEffect(() => {
    if (scrollRef.current && selectedRef.current && data.navigatedBy === 'keyboard') {
      scrollRef.current.style.pointerEvents = 'none';
      selectedRef.current.scrollIntoView({ block: 'nearest' });
      scrollRef.current.style.pointerEvents = 'all';
    }
  }, [data.selectedId, data.navigatedBy]);

  useEffect(() => {
    if (scrollRef.current && data.navigatedBy === 'mouse') {
      scrollRef.current.scrollTop = Math.abs(data.scrollTop);
    }
  }, [data.scrollTop, data.navigatedBy]);

  return (
    <Hideable isHidden={data.isHidden}>
      <AutocompleteList
        intersection={intersection}
        data-test-id="Autocomplete"
        ref={scrollRef}
        onWheel={(e) => onScrollList(inputs.pan([e.deltaX, e.deltaY], e.nativeEvent), e)}
      >
        <AutocompleteSectionTitle>Link to Card</AutocompleteSectionTitle>
        {data.results.length > 0 ? (
          data.results.map((result) => {
            const isSelected = targetEqual(result.item.target, data.selectedId);
            return (
              <ScrollListItem
                key={result.item.target.id}
                target={result.item.target}
                isSelected={isSelected}
                ref={isSelected ? selectedRef : null}
              >
                <AutocompleteListItem data-test-id="AutocompleteListItem">
                  {getHighlights(
                    clampTitleWithEllipsis(indexedItems[result.item.target.id].title ?? '', 46),
                    data.query
                  ) ?? null}
                </AutocompleteListItem>
              </ScrollListItem>
            );
          })
        ) : (
          <AutocompleteNoListItems>No results</AutocompleteNoListItems>
        )}
      </AutocompleteList>
    </Hideable>
  );
},
equal);
