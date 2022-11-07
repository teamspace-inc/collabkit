import type { ObjectMeta, Profile, ThreadInfo, ThreadMeta } from '@collabkit/core';

export type AvatarProps = {
  profile: Profile;
  size?: string;
};

export type Handle = HTMLDivElement | null;

export type ThreadProps = {
  objectId: string;
  objectName?: string;
  objectMeta?: ObjectMeta;
  url?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
};

// export type PopoverThreadProps = ThreadProps & {
//   maxAvailableSize?: { width: number; height: number } | null;
//   formatTimestamp?: (timestamp: number) => string;
// };
