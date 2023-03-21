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
  className?: string;
} & OptionalThreadProps;

export type OptionalThreadProps = {
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
  placeholder?: string;
};

export type OptionalComposerProps = {
  autoFocus?: boolean;
};

export type CommentProps = {
  commentId: string;
};
