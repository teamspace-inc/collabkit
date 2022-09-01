import { useEffect } from 'react';
import { Mention, MentionProps } from '@collabkit/core';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { actions } from '../../../client/src/actions';

export function SaveMentionableUsers(props: { mentionableUsers: MentionProps }) {
  const { store } = useApp();
  const { workspaceId } = useSnapshot(store);
  useEffect(() => {
    actions.saveMentionableUsers(store, props.mentionableUsers);
  }, [props.mentionableUsers.length, workspaceId]);

  return null;
}
