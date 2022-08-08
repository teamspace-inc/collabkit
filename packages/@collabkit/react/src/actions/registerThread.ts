import { Store } from '../constants';

export function registerThread(store: Store, props: { workspaceId: string; threadId: string }) {
  console.log('should load', props.threadId, props.workspaceId);
}
