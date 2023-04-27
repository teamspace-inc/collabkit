import { ref } from './refs';

type Props = {
  appId: string;
  workspaceId: string;
  threadId: string;
  userId: string;
};

export const setStatus = async ({ appId, workspaceId, threadId, userId }: Props) => {
  await ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`.set(true);
};

export const clearStatus = async ({ appId, workspaceId, threadId, userId }: Props) => {
  await ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`.remove();
};
