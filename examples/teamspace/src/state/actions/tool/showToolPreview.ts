import { getShapeUtils } from '../../../shapes';
import { State } from 'state/constants';

export const showToolPreview = (state: State, type: 'sticky' | 'card' | 'table') => {
  if (!state.currentSpace) {
    return;
  }
  const { defaultSize } = getShapeUtils(type);
  if (defaultSize) {
    state.currentSpace.pageState.toolPreview = {
      type,
      point: state.currentSpace.cursor,
      size: defaultSize,
    };
  }
};
