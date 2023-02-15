import { setupFirebase } from '../../../test-utils/src';
import { expect, test } from 'vitest';
import { ref } from '../../src/sync/firebase/refs';

setupFirebase();

test('ref encodes unsupported characters', () => {
  const id = 'baz/';
  expect(ref`foo/bar/${id}`.toString()).toStrictEqual(
    'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app/foo/bar/baz%252F'
  );
});
