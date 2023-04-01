import { loadAllCards } from 'network/loadCard';
import { State } from 'state/constants';

export const openCardCatalog = (state: State) => {
  // TODO(ville): need to also do this if loading the page directly from neuron.app/cards
  loadAllCards(state.store);

  history.pushState(null, '', '/cards');
};
