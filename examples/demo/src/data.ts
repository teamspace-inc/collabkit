import { IdentifyProps, MentionProps } from '@collabkit/react';

export const workspaceId = 'acme';

const ALICE = {
  userId: 'alice-1',
  name: 'Alice Levine',
  email: 'alice@example.com',
  avatar: 'https://www.uifiller.com/images/portraits/anon-4.jpg',
  workspaceId,
};
const JANET = {
  userId: 'janet-1',
  name: 'Janet Reilly',
  email: 'janet@example.org',
  avatar: 'https://www.uifiller.com/images/portraits/anon-40.jpg',
  workspaceId,
};
const JUAN = {
  userId: 'juan-1',
  name: 'Juan Dunn',
  email: 'juan@example.com',
  avatar: 'https://www.uifiller.com/images/portraits/anon-19.jpg',
  workspaceId,
};
const FRANK = {
  userId: 'frank-1',
  name: 'Frank Harvey',
  email: 'frank@example.edu',
  avatar: 'https://www.uifiller.com/images/portraits/anon-6.jpg',
  workspaceId,
};
export const users = { ALICE, JANET, JUAN, FRANK };

export const mentionableUsers: MentionProps = [ALICE, JANET, JUAN, FRANK];
