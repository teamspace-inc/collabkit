import type { Profile, ThreadInfo } from '@collabkit/core';

export type AvatarProps = {
  profile: Profile;
  size?: string;
};

export type Handle = HTMLDivElement | null;

export type ThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
};

// export type PopoverThreadProps = ThreadProps & {
//   maxAvailableSize?: { width: number; height: number } | null;
//   formatTimestamp?: (timestamp: number) => string;
// };
