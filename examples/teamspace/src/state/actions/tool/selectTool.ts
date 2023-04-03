import type { Tool, State } from 'state/constants';
import actions from '..';
import { assertUnreachable, getSelectedLinkables } from 'state/helpers';

export const selectTool = (state: State, tool: Tool) => {
  if (!state.currentSpace) {
    return;
  }

  state.currentSpace.pageState.tool = tool;

  switch (tool) {
    case 'select':
      actions.enter(state, 'idle');
      break;
    case 'text':
      actions.enter(state, 'text.idle');
      break;
    case 'sticky':
      actions.showToolPreview(state, 'sticky');
      actions.enter(state, 'sticky.idle');
      break;
    case 'image':
      actions.enter(state, 'image.idle');
      break;
    case 'card':
      actions.showToolPreview(state, 'card');
      actions.enter(state, 'card.idle');
      break;

    case 'table':
      actions.showToolPreview(state, 'table');
      actions.enter(state, 'table.idle');
      break;
    case 'hand':
      actions.enter(state, 'panning.idle');
      break;
    case 'link':
      actions.enter(state, 'link.idle');
      const linkablesCount = getSelectedLinkables(state).length;
      if (linkablesCount === 2) {
        actions.linkSelected(state);
        actions.enter(state, 'idle');
      } else if (linkablesCount > 2) {
        actions.deselectAll(state);
      }
      break;
    default:
      assertUnreachable(tool);
  }
};
