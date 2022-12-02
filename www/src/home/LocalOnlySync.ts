import type { Subscriptions, SyncAdapter } from '@collabkit/react/src/constants';
import { DataSnapshot } from 'firebase/database';

import { nanoid } from 'nanoid';
import { InboxChangeEventHandler, ThreadInfoChangeEvent } from 'packages/@collabkit/core/src/sync';

export class LocalOnlySync implements SyncAdapter {
  constructor(public workspaceData: any) {}

  async saveWorkspace(): Promise<void> {}

  getProfile() {
    return Promise.resolve(null);
  }

  getUser(): never {
    throw new Error('Method not implemented.');
  }
  saveThreadInfo(): Promise<void> {
    return Promise.resolve();
  }

  shouldAuthenticate(): boolean {
    return false;
  }

  serverTimestamp(): object {
    return {};
  }

  async saveProfile(): Promise<void> {
    // noop
  }

  async saveEvent(): Promise<{ id: string }> {
    return { id: nanoid() };
  }

  async markResolved(): Promise<void> {
    // noop
  }

  async markSeen(): Promise<void> {
    // noop
  }

  async startTyping(): Promise<void> {
    // noop
  }

  async stopTyping(): Promise<void> {
    // noop
  }

  async sendMessage(): Promise<{ id: string }> {
    return { id: nanoid() };
  }

  subscribeSeen(): void {
    // noop
  }

  subscribeOpenThreads(): void {
    // noop
  }

  subscribeThread(): void {
    // noop
  }

  subscribeInbox(props: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onInboxChange: InboxChangeEventHandler;
  }) {
    // noop
  }

  subscribeThreadInfo(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
  }): void {
    // noop
  }
}
