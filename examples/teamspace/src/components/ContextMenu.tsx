import React from 'react';
import { styled } from '@stitches/react';
import { COLUMN_WIDTH, MenuItem, MenuItemTarget, Z } from 'state/constants';
import { useAppContext } from '../hooks/useAppContext';
import { useSnapshot } from 'valtio';
import { useAppEvents } from '../events';
import { inputs } from '@tldraw/core';
import {
  ArrowArcLeft,
  ArrowArcRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Clipboard,
  Copy,
  CopySimple,
  EyeSlash,
  IconContext,
  Plus,
  Scissors,
  Trash,
  X,
} from 'phosphor-react';
import { Hint } from './Tooltip';
import { getOSMetaKeySymbol } from 'state/helpers';

const ICONS: Record<MenuItem, JSX.Element | undefined> = {
  selectAll: undefined,
  paste: <Clipboard />,
  copy: <CopySimple />,
  cut: <Scissors />,
  delete: <Trash />,
  duplicate: <Copy />,
  undo: <ArrowArcLeft />,
  redo: <ArrowArcRight />,
  deleteTableRow: <Trash />,
  deleteTableColumn: <Trash />,
  addTableRow: <Plus />,
  addTableColumn: <Plus />,
  insertTableRowAbove: <ArrowUp />,
  insertTableRowBelow: <ArrowDown />,
  insertTableColumnLeft: <ArrowLeft />,
  insertTableColumnRight: <ArrowRight />,
  hideSpace: <EyeSlash />,
  link: <ArrowRight />, // nice to have make this change based on where the elements are positioned
  unlink: <X />,
  startLinking: <ArrowUpRight />,
  divider: undefined,
};

const modifier = getOSMetaKeySymbol();

const MENU_ICON_SIZE = 16;

const EmptyIcon = styled('div', {
  display: 'inline-block',
  width: MENU_ICON_SIZE,
  height: MENU_ICON_SIZE,
});

const KEYBOARD_SHORTCUTS: Record<MenuItem, string | undefined> = {
  selectAll: `${modifier}+A`,
  paste: `${modifier}+V`,
  copy: `${modifier}+C`,
  cut: `${modifier}+X`,
  delete: `⌫`,
  duplicate: undefined,
  undo: `${modifier}+Z`,
  redo: `${modifier}+Shift+Z`,
  deleteTableRow: `⌫`,
  deleteTableColumn: `⌫`,
  addTableRow: undefined,
  addTableColumn: undefined,
  insertTableRowAbove: undefined,
  insertTableRowBelow: undefined,
  insertTableColumnLeft: undefined,
  insertTableColumnRight: undefined,
  hideSpace: undefined,
  link: `L`,
  unlink: undefined,
  startLinking: `L`,
  divider: undefined,
};

const Menu = styled('div', {
  zIndex: Z.SYSTEM_MODAL,
  width: COLUMN_WIDTH * 9,
  fontSize: '14px',
  lineHeight: '22px',
  background: '$ui$background',
  borderRadius: '$radii$1',
  color: '$ui$text',
  boxShadow: '$ui$shadow',
  padding: '$space$0',

  '& > ul': {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  '& > ul > li': {
    padding: 'calc($space$1/4*3) $space$1',
    borderRadius: 'calc( $radii$1 - 2px )',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    cursor: 'pointer',
    '&:hover': {
      background: '$ui$selection',
    },
  },
});

const Divider = styled('div', {
  background: '$ui$divider',
  width: 'calc(100% - $space$2)',
  display: 'flex',
  marginTop: '$space$1',
  marginBottom: '$space$1',
  marginLeft: 'calc($space$2/2)',
  height: 1,
});

export function ContextMenu() {
  const { onPointContextMenuItem } = useAppEvents();

  const handlePointerDown = React.useCallback((e: React.PointerEvent, menuItem: MenuItem) => {
    const info = inputs.pointerDown<MenuItemTarget>(e, { type: 'menuItem', id: menuItem });
    onPointContextMenuItem(info, e);
  }, []);

  const { contextMenu } = useSnapshot(useAppContext().store);

  let items: React.ReactElement[] = [];

  let i = 0;
  for (const menuItem of contextMenu.menuItems) {
    if (menuItem === 'divider') {
      items.push(<Divider key={'Divider' + i} />);
    } else {
      items.push(
        <li
          data-testid={`ContextMenuItem-${menuItem}`}
          key={menuItem}
          onPointerDown={(e) => handlePointerDown(e, menuItem)}
        >
          <span style={{ position: 'relative', top: 3, marginRight: 9 }}>
            {ICONS[menuItem] ?? (contextMenu.menuItems.length > 1 ? <EmptyIcon /> : null)}
          </span>
          {contextMenu.labels[menuItem]}
          <Hint style={{ float: 'right' }}>{KEYBOARD_SHORTCUTS[menuItem]}</Hint>
        </li>
      );
    }
    i++;
  }

  return (
    <Menu
      data-testid="ContextMenu"
      style={{
        position: 'absolute',
        left: contextMenu.point[0],
        top: contextMenu.point[1],
        zIndex: Z.SYSTEM_MODAL,
      }}
    >
      <IconContext.Provider value={{ size: MENU_ICON_SIZE, weight: 'regular' }}>
        <ul>{items}</ul>
      </IconContext.Provider>
    </Menu>
  );
}
