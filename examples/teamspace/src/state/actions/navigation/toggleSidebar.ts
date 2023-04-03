import { SIDEBAR_WIDTH } from 'components/Sidebar';
import { State } from 'state/constants';
import actions from '..';

export const toggleSidebar = (state: State) => {
  state.store.isSidebarOpen = !state.store.isSidebarOpen;

  if (state.currentSpace) {
    actions.panCamera(state.currentSpace, {
      delta: [(state.store.isSidebarOpen ? 1 : -1) * SIDEBAR_WIDTH, 0],
    });
  }
};
