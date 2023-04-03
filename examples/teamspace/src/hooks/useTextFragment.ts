import { ShapeTarget, TextCardTarget } from 'state/constants';
import { useSnapshot } from 'valtio';
import { useAppContext } from './useAppContext';

export function useTextFragment(target: TextCardTarget | ShapeTarget) {
  const data = useSnapshot(useAppContext().store);
  return target ? data.editing.texts[target.id] : undefined;
}
