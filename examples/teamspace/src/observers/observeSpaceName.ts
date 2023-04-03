import actions from 'state/actions';
import { GlobalStore, SpaceStore } from 'state/constants';
import { XmlFragment } from 'yjs';

export function observeSpaceName(
  fragment: XmlFragment,
  globalStore: GlobalStore,
  spaceStore: SpaceStore
): () => void {
  function onSpaceNameChange() {
    actions.saveSpace(globalStore, spaceStore);
  }

  fragment.observeDeep(onSpaceNameChange);

  return () => {
    fragment.unobserveDeep(onSpaceNameChange);
  };
}
