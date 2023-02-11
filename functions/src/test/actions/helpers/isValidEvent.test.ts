import { it, describe, expect } from 'vitest';
import { isValidEvent } from '../../../actions/helpers/isValidEvent';

describe('isValidEvent', () => {
  it('anything', () => {
    expect(isValidEvent('123123')).toBeFalsy();
    expect(isValidEvent(12345)).toBeFalsy();
    expect(isValidEvent(null)).toBeFalsy();
    expect(isValidEvent(undefined)).toBeFalsy();
  });
  it('blank object', () => {
    expect(isValidEvent({})).toBeFalsy();
  });
  it('required', () => {
    expect(
      isValidEvent({
        type: 'message',
        createdById: 'user1',
        createdAt: Date.now(),
        body: 'foo',
      })
    ).toBeTruthy();
  });
  it('required + parentId', () => {
    expect(
      isValidEvent({
        type: 'message',
        createdById: 'user1',
        createdAt: Date.now(),
        body: 'foo',
        parentId: 'event1',
      })
    ).toBeTruthy();
  });
  it('reaction no parentId', () => {
    expect(
      isValidEvent({
        type: 'reaction',
        createdById: 'user1',
        createdAt: Date.now(),
        body: 'foo',
      })
    ).toBeFalsy();
  });
  it('reaction + parentId', () => {
    expect(
      isValidEvent({
        type: 'reaction',
        createdById: 'user1',
        createdAt: Date.now(),
        body: 'foo',
        parentId: 'event1',
      })
    ).toBeTruthy();
  });
  it('system resolve', () => {
    expect(
      isValidEvent({
        type: 'system',
        system: 'resolve',
        createdById: 'user1',
        createdAt: Date.now(),
        body: 'foo',
        parentId: 'event1',
      })
    ).toBeTruthy();
  });
  it('system reopen', () => {
    expect(
      isValidEvent({
        type: 'system',
        system: 'reopen',
        createdById: 'user1',
        createdAt: Date.now(),
        body: 'foo',
      })
    ).toBeTruthy();
  });
});
