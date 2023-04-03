import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@stitches/react';
import { inputs } from '@tldraw/core';
import { MagnifyingGlass } from 'phosphor-react';
import { useSnapshot } from 'valtio';

import actions from 'state/actions';
import { COLUMN_WIDTH, Z } from 'state/constants';
import { useAppEvents } from '../events';
import { IndexItem } from '../types';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea, ScrollAreaThumb, ScrollAreaViewport, Scrollbar } from 'components/Scroll';
import { useOptionalSpaceStore } from 'hooks/useSpaceContext';
import { useAppContext } from 'hooks/useAppContext';
import { getHighlights } from 'utils/getHighlights';
import { targetEqual } from 'state/helpers';
import { config } from 'styles/stitches.config';
import { useEditorContext } from 'hooks/useEditorContext';

const RESULT_HEIGHT = 55;
const SEARCH_BAR_WIDTH = COLUMN_WIDTH * 22;

const Overlay = styled(Dialog.Overlay, {
  inset: 0,
  zIndex: Z.SYSTEM_MODAL,
  position: 'absolute',
});

const Content = styled(Dialog.Content, {
  width: SEARCH_BAR_WIDTH,
  position: 'absolute',
  top: '28vh',
  borderRadius: '$radii$2',
  border: 'none',
  background: '$colors$searchBarBackground',
  zIndex: Z.SYSTEM_MODAL,
  boxShadow: '$shadows$2',
});

const Center = styled('div', {
  display: 'grid',
  placeItems: 'center',
  overflowY: 'auto',
  height: '100vh',
  width: '100vw',
});

const SearchInput = styled('input', {
  display: 'flex',
  width: '100%',
  fontSize: '18px',
  lineHeight: '44px',
  height: RESULT_HEIGHT,
  padding: '0px 11px',
  color: '$colors$text',
  border: 'none',
  marginBottom: 0,
  outline: 'none',
  textIndent: 33,

  // boxShadow: `0px 1px 0px ${sandA.sandA5}`,

  borderRadius: '$radii$2',

  variants: {
    removeBorderBottomRadius: {
      true: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  },

  '&::placeholder': {
    color: '$colors$placeholderText',
    fontWeight: 400,
  },

  /* clears the ‘X’ from Chrome */
  '&::-webkit-search-decoration': { display: 'none' },
  '&::-webkit-search-cancel-button': { display: 'none' },
  '&::-webkit-search-results-button': { display: 'none' },
  '&::-webkit-search-results-decoration': { display: 'none' },
});

const Result = styled('div', {
  height: RESULT_HEIGHT,
  padding: '0px 11px',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '11px',
  lineHeight: '22px',
  variants: {
    disablePointerEvents: {
      true: {
        pointerEvents: 'none',
      },
    },
    isSelected: {
      true: {
        background: '$colors$buttonSelectedBackground',
        '&:first-of-type': {
          borderColor: 'transparent',
        },
        '&:last-of-type': {
          borderBottomRightRadius: '$radii$2',
          borderBottomLeftRadius: '$radii$2',
        },
      },
    },
  },
});

const Title = styled('div', {
  wordWrap: 'normal',
  overflowWrap: 'anywhere',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontWeight: 500,
  fontSize: '17px',
  lineHeight: '22px',

  variants: {
    isUntitled: {
      true: {
        color: '$colors$placeholderText',
        fontWeight: 400,
      },
    },
  },
});

const Text = styled('div', {
  fontSize: '13px',
  lineHeight: '18px',
  WebkitLineClamp: 1,
  maxHeight: '18px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  color: '$colors$text',
});

const SearchBarIcon = styled(MagnifyingGlass, {
  position: 'absolute',
  top: 19,
  left: 13.5,
});

export default function SearchBar() {
  const { store } = useAppContext();
  const events = useAppEvents();
  const { search, uiState } = useSnapshot(store);
  const open = uiState === 'search.showing';
  const { results, query, selectedId } = search;
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);
  const [didNavigateWithKeyboard, setDidNavigateWithKeyboard] = useState<boolean>(false);
  const lastOpen = useRef<boolean>(open);
  const editorContext = useEditorContext();

  // ScrollArea needs 'height' to be set to work
  // since we want the height to be dynamic, we
  // assign it based on the number of search
  // results.
  const maxHeight = RESULT_HEIGHT * 6.5;
  const height = Math.min((results?.length || 0) * RESULT_HEIGHT, maxHeight);

  // If we are navigating by keyboard, keep
  // the selected item in the middle of
  // the view.
  useEffect(() => {
    if (didNavigateWithKeyboard) {
      selectedRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [selectedId, didNavigateWithKeyboard]);

  // When we open the search bar and we
  // already have existing search results
  // auto scroll to the selectedId so
  // it's within frame, this has the
  // effect of helping the search bar
  // feel like it remembers what you
  // were doing.
  useEffect(() => {
    if (open && !lastOpen.current && selectedId) {
      setTimeout(() => {
        selectedRef.current?.scrollIntoView({
          block: 'center',
          behavior: 'auto',
        });
      }, 0);
    }
    lastOpen.current = open;
  }, [open, selectedId]);

  const currentSpace = useOptionalSpaceStore();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) actions.hideSearch({ store, currentSpace });
      }}
    >
      <Dialog.Portal>
        <Overlay />
        <Center>
          <Content>
            <SearchInput
              data-testid="SearchBarInput"
              removeBorderBottomRadius={!!(results && results.length > 0)}
              type="search"
              value={search.query || ''}
              placeholder="Quick Search"
              onFocus={events.onSearchInputFocus}
              onChange={events.onSearchInputChange}
              onKeyDown={(e) => {
                // Prevent the text cursor from moving to the start/end of
                // the input we are moving through the search results.
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  setDidNavigateWithKeyboard(true);
                }
              }}
            />
            <SearchBarIcon size={17.5} weight="bold" color={config.theme.colors.placeholderText} />
            {
              <ScrollArea
                ref={scrollRef}
                style={{ height }}
                onPointerMove={() => setDidNavigateWithKeyboard(false)}
              >
                <ScrollAreaViewport>
                  {results?.map((result, i) => {
                    const indexItem = search.indexedItems[result.item.target.id] as
                      | IndexItem
                      | undefined;
                    const { title, text } = indexItem || {};
                    return (
                      <Result
                        data-testid={`SearchBarResult-${i}`}
                        key={result.item.target.id}
                        isSelected={targetEqual(result.item.target, selectedId)}
                        // While navigating using the keyboard
                        // disable pointer events on a result so
                        //
                        disablePointerEvents={didNavigateWithKeyboard}
                        ref={targetEqual(result.item.target, selectedId) ? selectedRef : undefined}
                        onPointerOver={(e) => {
                          setDidNavigateWithKeyboard(false);
                          events.onPointerOver(inputs.pointerOver(e, result.item.target), e);
                        }}
                        onPointerDown={(e) => {
                          setDidNavigateWithKeyboard(false);
                          events.onPointerDown(
                            inputs.pointerDown(e, result.item.target),
                            e,
                            editorContext
                          );
                        }}
                      >
                        <Title isUntitled={!title}>
                          {(title && query && getHighlights(title, query)) || title || 'Untitled'}
                        </Title>
                        <Text>
                          {(text && query && getHighlights(text, query)) || 'No description'}
                        </Text>
                      </Result>
                    );
                  })}
                </ScrollAreaViewport>
                <Scrollbar orientation="vertical">
                  <ScrollAreaThumb />
                </Scrollbar>
              </ScrollArea>
            }
          </Content>
        </Center>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
