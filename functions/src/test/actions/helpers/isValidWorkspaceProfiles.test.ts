import { it, describe, expect } from 'vitest';
import { isValidWorkspaceProfiles } from '../../../actions/helpers/isValidWorkspaceProfiles';

describe('isValidWorkspaceProfiles', () => {
  it('empty', () => {
    expect(isValidWorkspaceProfiles({})).toBeTruthy();
  });
  it('invalid profiles', () => {
    expect(isValidWorkspaceProfiles({ user1: null, user2: true })).toBeFalsy();
  });
  it('valid profiles', () => {
    expect(isValidWorkspaceProfiles({ user1: true, user2: true })).toBeTruthy();
  });
});
