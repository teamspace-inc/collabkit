import {
  eventToFirebaseEvent,
  idArrayToObject,
  snapshotToEvent,
  snapshotToProfile,
  snapshotToUser,
} from '../../src/sync/firebase/converters';
import { expect, test } from 'vitest';
import { DataSnapshot } from 'firebase/database';

function snapshot(key: any, val: any) {
  return {
    val: () => val,
    key,
  } as DataSnapshot;
}

test('snapshotToUser null', () => {
  expect(snapshotToUser(snapshot('user-1', null))).toBeNull();
});

test('snapshotToUser empty', () => {
  expect(snapshotToUser(snapshot('user-1', {}))).toStrictEqual({
    userId: 'user-1',
  });
});

test('snapshotToUser expected', () => {
  expect(
    snapshotToUser(
      snapshot('user-1', {
        name: 'John Doe',
        email: 'john@acme.com',
        avatarUrl: 'https://acme.com/john.jpg',
      })
    )
  ).toStrictEqual({
    userId: 'user-1',
    name: 'John Doe',
    email: 'john@acme.com',
    avatarUrl: 'https://acme.com/john.jpg',
  });
});

test('snapshotToProfile null', () => {
  expect(snapshotToProfile(snapshot('user-1', null))).toBeNull();
});

test('snapshotToProfile empty', () => {
  expect(snapshotToProfile(snapshot('user-1', {}))).toStrictEqual({
    id: 'user-1',
    color: expect.any(String),
  });
});

test('snapshotToProfile expected', () => {
  expect(
    snapshotToProfile(
      snapshot('user-1', {
        name: 'John Doe',
        email: 'john@acme.com',
      })
    )
  ).toStrictEqual({
    id: 'user-1',
    name: 'John Doe',
    email: 'john@acme.com',
    color: expect.any(String),
  });
});

test('snapshotToEvent null', () => {
  expect(snapshotToEvent(snapshot('event-1', null))).toBeNull();
});

test('snapshotToEvent empty', () => {
  expect(snapshotToEvent(snapshot('event-1', { createdById: 'user-1' }))).toStrictEqual({
    id: 'event-1',
    createdById: 'user-1',
    mentions: [],
  });
});

test('snapshotToEvent expected', () => {
  expect(
    snapshotToEvent(
      snapshot('event-1', {
        type: 'message',
        body: 'body',
        createdAt: +new Date(),
        createdById: 'user-1',
      })
    )
  ).toStrictEqual({
    id: 'event-1',
    body: 'body',
    type: 'message',
    createdById: 'user-1',
    createdAt: expect.any(Number),
    mentions: [],
  });
});

test('idArrayToObject', () => {
  expect(idArrayToObject(['user-1', 'user-2'])).toStrictEqual({
    'user-1': true,
    'user-2': true,
  });
});

test('eventToFirebaseEvent', () => {
  expect(
    eventToFirebaseEvent({
      type: 'message',
      body: 'body',
      createdAt: +new Date(),
      createdById: 'user-1',
      mentions: ['user-1', 'user-2'],
      attachments: {
        ['foo']: {
          type: 'pin',
          x: 10,
          y: 20,
          objectId: 'object-1',
          meta: JSON.stringify({ foo: 'bar' }),
        },
      },
    })
  ).toStrictEqual({
    body: 'body',
    type: 'message',
    createdById: 'user-1',
    createdAt: expect.any(Number),
    parentId: null,
    system: null,
    mentions: {
      'user-1': true,
      'user-2': true,
    },
    attachments: {
      ['foo']: {
        type: 'pin',
        x: 10,
        y: 20,
        objectId: 'object-1',
        meta: JSON.stringify({ foo: 'bar' }),
      },
    },
  });
});
