import { IdentifyProps, MentionProps } from '@collabkit/react';

export const workspaceId = 'acme';

const ALICE = {
  workspaceId: 'acme',
  userId: 'alice-1',
  workspaceName: 'ACME',
  name: 'Alice Levine',
  email: 'alice@example.com',
  avatar: 'https://www.uifiller.com/images/portraits/anon-4.jpg',
};
const JANET: IdentifyProps = {
  workspaceId: 'acme',
  userId: 'janet-1',
  workspaceName: 'ACME',
  name: 'Janet Reilly',
  email: 'janet@example.org',
  avatar: 'https://www.uifiller.com/images/portraits/anon-40.jpg',
};
const JUAN: IdentifyProps = {
  workspaceId: 'acme',
  userId: 'juan-1',
  workspaceName: 'ACME',
  name: 'Juan Dunn',
  email: 'juan@example.com',
  avatar: 'https://www.uifiller.com/images/portraits/anon-19.jpg',
};
const FRANK: IdentifyProps = {
  workspaceId: 'acme',
  userId: 'frank-1',
  workspaceName: 'ACME',
  name: 'Frank Harvey',
  email: 'frank@example.edu',
  avatar: 'https://www.uifiller.com/images/portraits/anon-6.jpg',
};
export const users = { ALICE, JANET, JUAN, FRANK };

export const mentions: MentionProps = [ALICE, JANET, JUAN, FRANK];
