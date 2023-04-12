import { it, describe, expect } from 'vitest';
import admin from 'firebase-admin';
import { ref } from '../../../actions/data/refs';

import { updateUser } from '../../../actions/helpers/updateUser';

describe('updateUser', () => {
  it('creates a user and sets the right props', async () => {
    const userId = admin.firestore().collection('any').doc().id;
    const appId = 'QLVIR4HE-wvV_mTjoMJP5';
    await updateUser({
      appId: 'QLVIR4HE-wvV_mTjoMJP5',
      workspaceId: 'acme',
      userId,
      user: {
        name: 'Bob',
        email: 'bob@example.com',
      },
    });

    const user = (await ref`/profiles/${appId}/${userId}`.get()).val();
    expect(user).toStrictEqual({
      name: 'Bob',
      email: 'bob@example.com',
      color: expect.any(String),
    });
  });
});
