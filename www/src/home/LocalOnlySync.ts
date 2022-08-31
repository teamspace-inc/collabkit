import { OptionalWorkspaceProps } from '@collabkit/core';
import type { SyncAdapter } from '@collabkit/react/src/constants';
import { DataSnapshot } from 'firebase/database';

import { nanoid } from 'nanoid';

export class LocalOnlySync implements SyncAdapter {
  constructor(public workspaceData: any) {}
  saveWorkspace(params: {
    appId: string;
    workspaceId: string;
    workspace?: OptionalWorkspaceProps | null | undefined;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getProfile(params: { appId: string; userId: string }): Promise<
    | {
        name?: string | undefined;
        email?: string | undefined;
        color?: string | undefined;
        avatar?: string | undefined;
      }
    | null
    | undefined
  > {
    return Promise.resolve(null);
  }

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
