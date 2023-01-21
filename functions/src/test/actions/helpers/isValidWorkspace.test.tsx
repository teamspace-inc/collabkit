import { it, describe, expect } from 'vitest';
import { isValidWorkspace } from '../../../actions/helpers/isValidWorkspace';

describe('isValidWorkspace', () => {
  it('empty', () => {
    expect(isValidWorkspace({})).toBeTruthy();
  });
  it('invalid name', () => {
    expect(isValidWorkspace({ name: {} })).toBeFalsy();
  });
  it('valid name', () => {
    expect(isValidWorkspace({ name: 'foo' })).toBeTruthy();
  });
  it('valid name + invalid profiles', () => {
    expect(isValidWorkspace({ name: 'foo', profiles: { user1: null } })).toBeFalsy();
  });
  it('valid name + valid profiles', () => {
    expect(isValidWorkspace({ name: 'foo', profiles: { user1: true } })).toBeTruthy();
  });
});
