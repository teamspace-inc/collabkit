import * as admin from 'firebase-admin';

import { updateUserAndWorkspace } from '../../../actions/helpers/updateUserAndWorkspace';

describe('updateUserAndWorkspace', () => {
  it('calls fetch with the right args', async () => {
    const userId = admin.firestore().collection('any').doc().id;
    const appId = 'QLVIR4HE-wvV_mTjoMJP5';
    await updateUserAndWorkspace({
      appId: 'QLVIR4HE-wvV_mTjoMJP5',
      workspaceId: 'acme',
      userId,
      user: {
        name: 'Bob',
        email: 'bob@example.com',
      },
    });

    const user = await (await admin.database().ref(`/profiles/${appId}/${userId}`).get()).val();
    expect(user).toStrictEqual({
      name: 'Bob',
      email: 'bob@example.com',
      color: expect.any(String),
    });
  });
});
