import type { ThreadInfo, Subscriptions, SyncAdapter } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { InboxChangeEventHandler, ThreadInfoChangeEvent } from 'packages/@collabkit/core/src/sync';

export class LocalOnlySync implements SyncAdapter {
  constructor(public workspaceData: any) {}
  nextEventId(params: { appId: string; workspaceId: string; threadId: string }): string {
    return nanoid();
  }
  nextPinId(params: { appId: string; workspaceId: string; objectId: string }): string {
    return nanoid();
  }
  nextThreadId(params: { appId: string; workspaceId: string }): string {
    return nanoid();
  }

  savePin(params: {
    appId: string;
    workspaceId: string;
    userId: string;
    pin: {
      objectId: string;
      eventId: string;
      threadId: string;
      x: number;
      y: number;
    };
  }): Promise<string> {
    return Promise.resolve('foo');
  }
  deletePin(params: {
    appId: string;
    workspaceId: string;
    objectId: string;
    pinId: string;
  }): Promise<void> {
    return Promise.resolve();
  }

  subscribeOpenPins(params: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onGet: (pins: { [objectId: string]: { [pinId: string]: { x: number; y: number } } }) => void;
    onObjectChange: (objectId: string, pins: { [pinId: string]: { x: number; y: number } }) => void;
    onObjectRemove: (objectId: string) => void;
  }): Promise<void> {
    return Promise.resolve();
  }
  movePin(params: {
    appId: string; // noop
    // noop
    workspaceId: string;
    pinId: string;
    x: number;
    y: number;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getIsTyping(props: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<{ [userId: string]: boolean } | null> {
    throw new Error('Method not implemented.');
  }

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

  getOpenThreads({
    appId,
    workspaceId,
  }: {
    appId: string;
    workspaceId: string;
  }): Promise<{ threadId: string; info: ThreadInfo }[]> {
    return Promise.resolve([]);
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
