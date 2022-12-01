import type { Profile, ThreadInfo } from '@collabkit/core';

export type AvatarProps = {
  profile: Profile;
  size?: string;
};

export type Handle = HTMLDivElement | null;

export type ThreadProps = {
  threadId: string;
  info?: Omit<ThreadInfo, 'defaultSubscribers'>;
  defaultSubscribers?: string[];
  style?: React.CSSProperties;
} & OptionalThreadProps;

export type OptionalThreadProps = {
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
  hideResolveButton?: boolean;
};

// export type PopoverThreadProps = ThreadProps & {
//   maxAvailableSize?: { width: number; height: number } | null;
//   formatTimestamp?: (timestamp: number) => string;
// };
