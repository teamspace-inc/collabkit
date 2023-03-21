import { createComposer, createStore, createWorkspace } from '../src/store';
import { expect, test } from 'vitest';

test('createWorkspace', () => {
  expect(createWorkspace()).toStrictEqual({
    inbox: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    threadInfo: {},
    threadProfiles: {},
    pendingThreadInfo: {},
    openPins: {},
    eventPins: {},
    computed: {},
    isResolved: {},
    isOpen: {},
  });
});

test('createComposer', () => {
  expect(createComposer()).toStrictEqual({
    isTyping: {},
    editor: null,
    enabled: false,
    isMentioning: false,
    hasText: false,
    attachments: {},
  });
});
