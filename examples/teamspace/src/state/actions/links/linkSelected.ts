import { State } from 'state/constants';
import { createLink, getSelectedLinkables } from 'state/helpers';

export function linkSelected(state: State) {
  const space = state.currentSpace;
  if (!space) {
    return;
  }

  const linkableTargets = getSelectedLinkables(state);

  if (linkableTargets.length === 2) {
    createLink(state, linkableTargets[0], linkableTargets[1]);
    return;
  } else {
    console.warn('[linkSelected] too few or too many linkables');
  }
}
