import { Subscriptions } from '@collabkit/react';
import { PinEventHandler, SyncAdapter } from '@collabkit/react/src/sync';

import { nanoid } from 'nanoid';

export class LocalOnlySync implements SyncAdapter {
  constructor(public workspaceData: any) {}

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

  subscribePins(
    params: {
      appId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onPinChange: PinEventHandler
  ): void {
    // for (const pinId in this.workspaceData.pins) {
    //   onPinChange({
    //     pinId,
    //     pin: this.workspaceData.pins[pinId],
    //   });
    // }
  }

  subscribeThread(): void {
    // noop
  }
}
