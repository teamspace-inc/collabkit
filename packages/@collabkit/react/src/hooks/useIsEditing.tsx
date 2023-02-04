import { useSnapshot } from 'valtio';
import { useCommentContext } from './useCommentContext';
import { useApp } from './useApp';

export function useIsEditing() {
  const { store } = useApp();
  const { editingId } = useSnapshot(store);
  const { eventId, treeId } = useCommentContext();
  return editingId?.eventId === eventId && editingId.treeId == treeId;
}
