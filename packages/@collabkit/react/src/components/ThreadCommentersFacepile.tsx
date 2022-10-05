import { Profile } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useTimelineStore } from '../hooks/useTimelineStore';
import { Facepile } from './Facepile';
import { unique } from './Inbox';

export function ThreadCommentersFacepile(
  props: { hover: boolean } & React.ComponentPropsWithoutRef<'div'>
) {
  const timeline = useSnapshot(useTimelineStore());
  const { profiles } = useSnapshot(useApp().store);

  const commenters = Object.keys(timeline)
    .map((eventId) => timeline[eventId].createdById)
    .filter(unique)
    .map((commenterId) => profiles[commenterId])
    .filter((profile): profile is Profile => !!profile);

  return commenters ? <Facepile profiles={commenters} {...props} /> : null;
}
