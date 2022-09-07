import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useCommentStore } from './useCommentStore';

export function CommentCreatorName(props: React.ComponentPropsWithoutRef<'span'>) {
  const { createdById } = useSnapshot(useCommentStore());
  const { profiles } = useSnapshot(useApp().store);
  const profile = profiles[createdById];
  return <span {...props}>{profile?.name ?? profile.email ?? 'Anonymous'}</span>;
}
