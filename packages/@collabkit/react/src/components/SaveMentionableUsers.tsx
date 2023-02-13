import { useEffect } from 'react';
import { MentionProps } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { actions } from '../../../client/src/actions';
import { useStore } from '../hooks/useStore';

export function SaveMentionableUsers(props: { mentionableUsers: MentionProps }) {
  const store = useStore();
  const { workspaceId } = useSnapshot(store);
  useEffect(() => {
    actions.saveMentionableUsers(store, props.mentionableUsers);
  }, [props.mentionableUsers.length, workspaceId]);

  return null;
}
