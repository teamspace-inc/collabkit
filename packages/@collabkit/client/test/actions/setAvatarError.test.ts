import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { setAvatarError } from '../../src/actions/setAvatarError';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';

test('setAvatarError', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  setAvatarError(store as Store, { avatar: '/avatar.png' });
  expect(store.avatarErrors).toEqual({ ['/avatar.png']: true });
  setAvatarError(store as Store, { avatar: '/avatar2.png' });
  expect(store.avatarErrors).toEqual({ ['/avatar.png']: true, ['/avatar2.png']: true });
});
