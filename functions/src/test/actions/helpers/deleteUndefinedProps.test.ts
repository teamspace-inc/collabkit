import { it, describe, expect } from 'vitest';
import { deleteUndefinedProps } from '../../../actions/helpers/deleteUndefinedProps';

describe('deleteUndefinedProps', () => {
  it('deletes undefined props', () => {
    expect(
      deleteUndefinedProps({
        foo: undefined,
        bar: 'defined',
        baz: null,
      })
    ).toStrictEqual({
      bar: 'defined',
      baz: null,
    });
  });
});
