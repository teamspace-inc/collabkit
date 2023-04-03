import { GlobalStore } from 'state/constants';
import { nanoid } from '../../../utils/nanoid';

export function openNewSpace(store: GlobalStore) {
  const spaceId = nanoid();
  history.pushState(null, '', `/${spaceId}`);
}
