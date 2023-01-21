import { test, describe, expect } from 'vitest';
import { isValidUser } from '../../../actions/helpers/isValidUser';

describe('isValidUser', () => {
  test('undefined', () => {
    expect(isValidUser(undefined)).toBe(false);
  });
  test('null', () => {
    expect(isValidUser(undefined)).toBe(false);
  });

  test('name', () => {
    expect(isValidUser({ name: 'foo' })).toBe(true);
  });
  test('name (undefined)', () => {
    expect(isValidUser({ name: undefined })).toBe(false);
  });
  test('name (object)', () => {
    expect(isValidUser({ name: {} })).toBe(false);
  });

  test('email', () => {
    expect(isValidUser({ email: 'foo@example.com' })).toBe(true);
  });
  test('email (undefined)', () => {
    expect(isValidUser({ email: undefined })).toBe(false);
  });
  test('email (object)', () => {
    expect(isValidUser({ email: {} })).toBe(false);
  });

  test('avatar', () => {
    expect(isValidUser({ avatar: 'https://example.com/foo.png' })).toBe(true);
  });
  test('avatar (undefined)', () => {
    expect(isValidUser({ avatar: undefined })).toBe(false);
  });
  test('avatar (invalid url)', () => {
    expect(isValidUser({ avatar: 'foo' })).toBe(false);
  });
});
