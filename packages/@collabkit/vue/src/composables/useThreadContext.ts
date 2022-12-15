import { ThreadKey } from '../constants';
import { inject } from 'vue';

export function useThreadContext(): string {
  const threadId = inject<string>(ThreadKey);
  if (!threadId) {
    throw new Error('ThreadContext not found');
  }
  return threadId;
}
