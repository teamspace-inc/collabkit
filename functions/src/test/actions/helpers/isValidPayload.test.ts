import { isValidPayload } from '../../../actions/helpers/isValidPayload';

describe('isValidPayload', () => {
  test('undefined', () => {
    expect(isValidPayload(undefined)).toBe(false);
  });
  test('null', () => {
    expect(isValidPayload(undefined)).toBe(false);
  });

  test('userId', () => {
    expect(isValidPayload({ userId: 'test' })).toBe(true);
  });

  test('userId (undefined)', () => {
    expect(isValidPayload({ userId: 'test' })).toBe(true);   });

  test('userId (object)', () => {
    expect(isValidPayload({ userId: {} })).toBe(false);
  });

  test('workspaceId', () => {
    expect(isValidPayload({ workspaceId: 'test' })).toBe(true);
  });

  test('workspaceId (undefined)', () => {
    expect(isValidPayload({ workspaceId: undefined })).toBe(false);
  });
  test('workspaceId (object)', () => {
    expect(isValidPayload({ workspaceId: {} })).toBe(false);
  });

});
