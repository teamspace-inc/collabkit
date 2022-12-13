import { setupFirebase } from '../setupFirebase';
import { expect, test } from 'vitest';
import { ref } from '../../src/sync/firebase/refs';

setupFirebase();

test('ref encodes unsupported characters', () => {
  const id = 'baz/';
  expect(ref`foo/bar/${id}`.toString()).toStrictEqual(
    'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app/foo/bar/baz%252F'
  );
});

test('timelineRef', () => {
  expect(ref`timeline/${'foo'}`.toString()).toStrictEqual(
    'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app/timeline/foo'
  );
});

test('typingRef', () => {
  expect(ref`isTyping/${'foo'}`.toString()).toStrictEqual(
    'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app/isTyping/foo'
  );
});

test('userTypingRef', () => {
  expect(ref`isTyping/${'foo'}/${'bar'}/${'baz'}`.toString()).toStrictEqual(
    'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app/isTyping/foo/bar/baz'
  );
});
