import React from 'react';
import { sand } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { inputs } from '@tldraw/core';
import { Plus, MagnifyingGlass, Asterisk, CaretLeft, CaretRight } from 'phosphor-react';
import equal from 'fast-deep-equal';
import { useSnapshot } from 'valtio';
import { useRoute } from 'wouter';

import { useAppContext } from 'hooks/useAppContext';
import { useCurrentSpaceId, useSpaceContext } from 'hooks/useSpaceContext';
import { useAppEvents } from '../events';
import { ScrollArea, ScrollAreaViewport, Scrollbar, ScrollAreaThumb } from 'components/Scroll';
import { ellipsis } from 'styles/ellipsis';
import { CardItem, COLUMN_WIDTH, SidebarPointerTarget, TableItem, Target } from 'state/constants';
import { getVisibleItems } from 'state/helpers';
import { targetEqual } from 'state/actions/shapes/targetEqual';
import { IconButton } from 'components/IconButton';

export const SIDEBAR_WIDTH = COLUMN_WIDTH * 11;

const Container = styled('nav', {
  position: 'absolute',
  inset: 0,
  width: SIDEBAR_WIDTH,
  display: 'flex',
  background: '$colors$sidebarBackground',
  padding: `0px 0px $space$1 $space$0`,
});

const SidebarTitle = styled('h4', {
  marginTop: '$space$3',
  fontSize: '$fontSizes$tiny',
  lineHeight: '$lineHeights$tiny',
  height: '$size$3',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '$colors$sidebarText',
  padding: '0px 0px 0px $space$2',
  marginBottom: 0,
  fontWeight: 500,
});

const SidebarItem = styled('div', {
  display: 'flex',
  alignItems: 'center',

  margin: `$space$0 $size$1 $space$0 $space$1`,
  fontSize: '$fontSizes$p',
  lineHeight: '$lineHeights$p',
  color: '$colors$sidebarText',

  height: 'calc($lineHeights$h2 - 2 * $space$0)',

  padding: '0 $space$2',
  borderRadius: '$radii$1',
  fontWeight: 500,

  maxWidth: `calc(${SIDEBAR_WIDTH}px - $space$1)`,

  '&:first-of-type': {
    marginTop: 11,
  },

  variants: {
    isSelected: {
      true: {
        color: sand.sand12,
        background: '$colors$sidebarSelectedBackground',
      },
    },
  },

  '&:hover': {
    background: '$colors$buttonHoveringBackground',
  },
});

const SidebarPlaceholder = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '0px 11px',
  fontSize: '$fontSizes$small',
  lineHeight: '$lineHeights$small',
  color: '$colors$placeholderText',
});

const SidebarItemText = styled(
  'div',
  {
    flex: 1,
    boxSizing: 'border-box',
  },
  ellipsis
);

const AddSpaceIcon = styled(Plus, {
  marginRight: '$space$0',
});

type SidebarProps = {
  children?: React.ReactNode;
};

const Wordmark = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$space$0',
  padding: '$space$2 0',
  marginTop: '$space$0',
  fontSize: 18,
  fontWeight: 600,
});

const Logo = styled(Asterisk, {
  marginLeft: '$space$1',
});

const Beta = styled('sup', {
  fontSize: '$fontSizes$tiny',
  lineHeight: '$lineHeights$tiny',
  letterSpacing: '0.05em',
  fontWeight: 700,
  position: 'relative',
  color: sand.sand11,
  textTransform: 'uppercase',
});

export function ToggleSidebarButton(props: { onlyShowIfHidden?: boolean }) {
  const { isSidebarOpen } = useSnapshot(useAppContext().store);
  const { onSidebarPointItem } = useAppEvents();

  if (isSidebarOpen && props.onlyShowIfHidden) {
    return null;
  }

  return (
    <IconButton
      key={`SidebarItem-HideSidebar`}
      data-testid={`SidebarItem-HideSidebar`}
      isActive={false}
      offset={[-1, 0]}
      onPointerUp={(e) => {
        const target: SidebarPointerTarget = { type: 'sidebar' };
        const info = inputs.pointerUp(e, target);
        onSidebarPointItem(info, e);
      }}
      tooltip={isSidebarOpen ? 'Close' : 'Open Sidebar'}
    >
      {isSidebarOpen ? <CaretLeft /> : <CaretRight />}
    </IconButton>
  );
}

export function SearchButton(props: {
  isActive: boolean;
  onPointerUp: (e: React.PointerEvent) => void;
}) {
  return (
    <IconButton
      key={`SidebarItem-Search`}
      data-testid={`SidebarItem-Search`}
      isActive={props.isActive}
      offset={[-1, -1]}
      activeIconWeight={'regular'}
      onPointerUp={props.onPointerUp}
      tooltip={'Quick Search'}
    >
      <MagnifyingGlass />
    </IconButton>
  );
}

const SidebarToolbar = styled('div', {
  position: 'absolute',
  top: '$space$1',
  right: '$space$1',
  padding: '$space$0',
  gap: '$space$0',
  display: 'flex',
});

export const Sidebar = React.memo(function Sidebar({ children }: SidebarProps) {
  const { onSidebarPointItem, onContextMenu } = useAppEvents();
  const { savedSpaces, uiState, isSidebarOpen } = useSnapshot(useAppContext().store);
  const currentSpaceId = useCurrentSpaceId();
  const [isCatalogScreen] = useRoute('/cards');

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <Container>
      <ScrollArea>
        <ScrollAreaViewport>
          <Wordmark>
            <Logo size={27.5} color={sand.sand11} weight="fill" />
            {/* neuron */}
            <Beta>Beta</Beta>
          </Wordmark>
          <SidebarToolbar>
            <SearchButton
              isActive={uiState === 'search.showing'}
              onPointerUp={(e) => {
                const target: SidebarPointerTarget = { type: 'search' };
                const info = inputs.pointerUp(e, target);
                onSidebarPointItem(info, e);
              }}
            />
            <ToggleSidebarButton />
          </SidebarToolbar>

          {isCatalogScreen && (
            <SidebarItem
              key="SidebarItem-catalog"
              data-test-id="SidebarItem-catalog"
              isSelected={isCatalogScreen}
              onPointerUp={(e) => {
                const target: SidebarPointerTarget = { type: 'catalog' };
                const info = inputs.pointerUp(e, target);
                onSidebarPointItem(info, e);
              }}
            >
              {/* <CatalogIcon size={16} weight="bold" /> */}
              All Cards
            </SidebarItem>
          )}

          <SidebarTitle>Spaces</SidebarTitle>
          {savedSpaces.map((space) => (
            <SidebarItem
              key={space.id}
              data-test-id="SidebarItem-space"
              isSelected={space.id === currentSpaceId}
              onContextMenu={(e) => {
                const info = inputs.contextMenu<Target>(e, { type: 'space', id: space.id });
                onContextMenu(info, e);
              }}
              onPointerUp={(e) => {
                if (e.button === 2) {
                  return;
                }
                const target: SidebarPointerTarget = { type: 'space', id: space.id };
                const info = inputs.pointerUp(e, target);
                onSidebarPointItem(info, e);
              }}
            >
              <SidebarItemText>{space.name || 'Untitled'}</SidebarItemText>
            </SidebarItem>
          ))}
          <SidebarItem
            key="SidebarItem-add-space"
            data-test-id="SidebarItem-add-space"
            onPointerUp={(e) => {
              const target: SidebarPointerTarget = { type: 'newSpace' };
              const info = inputs.pointerUp(e, target);
              onSidebarPointItem(info, e);
            }}
          >
            <AddSpaceIcon weight="bold" />
            Add a Space
          </SidebarItem>
          {children}
        </ScrollAreaViewport>
        <Scrollbar orientation="vertical">
          <ScrollAreaThumb />
        </Scrollbar>
      </ScrollArea>
    </Container>
  );
}, equal);

export function CardsInSpace() {
  const events = useAppEvents();
  const { store } = useAppContext();
  const { search } = useSnapshot(store);

  const data = useSnapshot(useSpaceContext().store);
  const { selectedIds } = store.editing;

  const cards: (CardItem | TableItem)[] = getVisibleItems(data)
    .filter((item): item is CardItem | TableItem => item.type === 'card' || item.type === 'table')
    .reverse();

  return (
    <>
      <SidebarTitle>Cards</SidebarTitle>
      {cards.length > 0 ? (
        cards.map((item, i) => (
          <SidebarItem
            key={item.id}
            data-test-id="SidebarItem-card"
            isSelected={selectedIds.some((target) =>
              targetEqual(target, { type: 'shape', id: item.id })
            )}
            onContextMenu={(e) => {
              const info = inputs.contextMenu<Target>(e, { type: 'shape', id: item.id });
              events.onContextMenu(info, e);
            }}
            onPointerUp={(e) => {
              const target: SidebarPointerTarget = { type: 'shape', id: item.id };
              const info = inputs.pointerUp(e, target);
              events.onSidebarPointItem(info, e);
            }}
          >
            <SidebarItemText>
              {search.indexedItems[item.docId]?.title || 'Untitled'}
            </SidebarItemText>
          </SidebarItem>
        ))
      ) : (
        <SidebarPlaceholder>No cards.</SidebarPlaceholder>
      )}
    </>
  );
}
