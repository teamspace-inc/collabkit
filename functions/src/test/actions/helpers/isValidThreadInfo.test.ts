import { it, describe, expect } from 'vitest';
import { isValidThreadInfo } from '../../../actions/helpers/isValidThreadInfo';

describe('isValidThreadInfo', () => {
  it('anything', () => {
    expect(isValidThreadInfo(12345)).toBeFalsy();
    expect(isValidThreadInfo(null)).toBeFalsy();
  });
  it('undefined', () => {
    expect(isValidThreadInfo(undefined)).toBeFalsy();
  });
  it('blank object', () => {
    expect(isValidThreadInfo({})).toBeFalsy();
  });
  it('url', () => {
    expect(isValidThreadInfo({ url: 'https://foo.com/url' })).toBeTruthy();
  });
  it('name', () => {
    expect(isValidThreadInfo({ name: 'Test thread' })).toBeFalsy();
  });
  it('name + url', () => {
    expect(isValidThreadInfo({ name: 'Test thread', url: 'https://foo.com' })).toBeTruthy();
  });
});
