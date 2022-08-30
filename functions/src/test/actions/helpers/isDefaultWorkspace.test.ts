import { isDefaultWorkspace } from '../../../actions/helpers/isDefaultWorkspace';

describe('isDefaultWorkspace', () => {
  it('anything', () => {
    expect(isDefaultWorkspace('foo')).toBeFalsy();
    expect(isDefaultWorkspace('')).toBeFalsy();
    expect(isDefaultWorkspace('12j4e123n')).toBeFalsy();
    expect(isDefaultWorkspace('ACME')).toBeFalsy();
  });
  it('default', () => {
    expect(isDefaultWorkspace('default')).toBeTruthy();
  });
});
