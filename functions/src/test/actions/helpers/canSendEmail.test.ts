import { it, describe, expect } from 'vitest';
import { canSendEmail } from '../../../actions/helpers/canSendEmail';

describe('canSendEmail', () => {
  it('empty', () => {
    expect(canSendEmail({})).toBeFalsy();
  });
  it('invalid email', () => {
    expect(canSendEmail({ email: 'foo' })).toBeFalsy();
  });
  it('valid email', () => {
    expect(canSendEmail({ email: 'foo@example.com' })).toBeTruthy();
  });
});
