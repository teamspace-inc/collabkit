import { test, describe, expect } from 'vitest';
import { isValidPayload } from '../../../actions/helpers/isValidPayload';

describe('isValidPayload', () => {
  test('undefined', () => {
    expect(isValidPayload(undefined)).toBe(false);
  });
  test('null', () => {
    expect(isValidPayload(undefined)).toBe(false);
  });

  test('userId', () => {
    expect(isValidPayload({ userId: 'test' })).toBe(false);
  });

  test('userId (undefined)', () => {
    expect(isValidPayload({ userId: 'test' })).toBe(false);
  });

  test('userId (object)', () => {
    expect(isValidPayload({ userId: {} })).toBe(false);
  });

  test('workspaceId', () => {
    expect(isValidPayload({ workspaceId: 'test' })).toBe(false);
  });

  test('workspaceId (undefined)', () => {
    expect(isValidPayload({ workspaceId: undefined })).toBe(false);
  });

  test('workspaceId (object)', () => {
    expect(isValidPayload({ workspaceId: {} })).toBe(false);
  });

  test('workspaceId + userId', () => {
    expect(isValidPayload({ userId: 'test', workspaceId: 'test' })).toBe(true);
  });
});
