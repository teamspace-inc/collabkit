import { useSnapshot } from 'valtio';
import { useOptionalCommentStore } from '../useCommentStore';

export function useComment(props: { commentId: string }) {
  return useSnapshot(useOptionalCommentStore({ eventId: props.commentId }));
}
