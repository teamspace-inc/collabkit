import { TLContextMenuInfo } from '@tldraw/core';
import type { State, Target } from 'state/constants';
import {
  getLinkCount,
  getPagePoint,
  getSelectedLinkables,
  hasLinkTo,
  isSelectableTarget,
  isTargetSelected,
} from 'state/helpers';
import { store } from 'state/store';
import actions from '..';

export const showContextMenu = (state: State, info: TLContextMenuInfo<Target>) => {
  store.contextMenu.point = info.pagePoint;

  if (state.currentSpace) {
    store.contextMenu.canvasPoint = getPagePoint(info.point, state.currentSpace?.pageState);
  }

  actions.enter(state, 'contextMenu.showing');

  const target = info.target;

  // if we are right clicking a shape that isn't selected
  // we need to add it to the selection so it can be used
  // to compute the relevant menu items below
  // we don't reuse actions.select as this has a different
  // behaviour w.r.t. shiftKey being pressed.
  if (target.type === 'shape') {
    // switch selection on right click
    if (isSelectableTarget(target) && !isTargetSelected(state, target)) {
      state.store.editing.selectedIds.push(target);
    }
  }

  state.store.contextMenu.menuItems = [];
  state.store.contextMenu.target = target;

  const { menuItems } = state.store.contextMenu;

  const linkableTargets = getSelectedLinkables(state);

  const [a, b] = linkableTargets;

  // we only add these items if the user
  // has right clicked on a linkable
  // otherwise, e.g. if a user right clicks
  // on the canvas, link / unlink make less sense
  // even if there is a valid selected linkable
  if (isSelectableTarget(target)) {
    // we always check against the underlying selectedIds
    // incase there was a selectedId that isn't linkable
    // we don't want to show a menu option in that situation
    // it would be confusing. ideally we indicate to the user
    // they have selected something that isn't linkable as well
    if (a && store.editing.selectedIds.length === 1) {
      menuItems.push('startLinking');
      const linkCount = getLinkCount(state, a);
      if (linkCount > 0) {
        menuItems.push('unlink');
        state.store.contextMenu.labels.unlink = linkCount > 1 ? 'Remove all links' : 'Remove link';
      }
    } else if (a && b && store.editing.selectedIds.length === 2) {
      if (hasLinkTo(state, a, b)) {
        menuItems.push('unlink');
        state.store.contextMenu.labels.unlink = 'Remove link';
      } else {
        menuItems.push('link');
      }
    }
  }

  switch (info.target.type) {
    case 'tableRow': {
      menuItems.push('insertTableRowAbove');
      menuItems.push('insertTableRowBelow');
      menuItems.push('deleteTableRow');
      break;
    }

    case 'tableColumn': {
      menuItems.push('insertTableColumnLeft');
      menuItems.push('insertTableColumnRight');
      menuItems.push('deleteTableColumn');
      break;
    }

    case 'tableCell':
      menuItems.push('addTableColumn');
      menuItems.push('addTableRow');
      menuItems.push('deleteTableColumn');
      menuItems.push('deleteTableRow');
      break;

    case 'bounds':
      console.log('todo implement context menu bounds');
      break;

    case 'canvas': {
      if (state.currentSpace) {
        if (state.currentSpace.pageState.clipboard?.state !== 'idle') {
          menuItems.push('paste');
        }
      }

      menuItems.push('selectAll');

      break;
    }
    case 'space': {
      menuItems.push('hideSpace');
      break;
    }
    case 'shape': {
      if (menuItems.length > 0) {
        menuItems.push('divider');
      }
      menuItems.push('copy');
      menuItems.push('cut');
      menuItems.push('delete');
      break;
    }
    default: {
    }
  }
};
