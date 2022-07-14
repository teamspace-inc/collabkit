import { MentionProps } from '@collabkit/react';

export const workspaceId = 'acme';

const ALICE = {
  userId: 'alice-1',
  name: 'Alice Levine',
  email: 'alice@example.com',
  workspaceId,
};
const JANET = {
  userId: 'janet-1',
  name: 'Janet Reilly',
  email: 'janet@example.org',
  workspaceId,
};
const JUAN = {
  userId: 'juan-1',
  name: 'Juan Dunn',
  email: 'juan@example.com',
  workspaceId,
};
const FRANK = {
  userId: 'frank-1',
  name: 'Frank Harvey',
  email: 'frank@example.edu',
  workspaceId,
};
export const users = { ALICE, JANET, JUAN, FRANK };

export const mentionableUsers: MentionProps = [ALICE, JANET, JUAN, FRANK];
