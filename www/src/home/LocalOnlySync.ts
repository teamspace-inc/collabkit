import type { SyncAdapter } from '@collabkit/react/src/constants';
import { DataSnapshot } from 'firebase/database';

import { nanoid } from 'nanoid';

export class LocalOnlySync implements SyncAdapter {
  constructor(public workspaceData: any) {}
  getUser(params: { userId: string; appId: string }): Promise<DataSnapshot> {
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

  subscribePins(): void {
    // noop
  }

  subscribeThread(): void {
    // noop
  }
}
