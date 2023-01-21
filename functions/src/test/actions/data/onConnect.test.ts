import { it, describe } from 'vitest';
import { onConnect } from '../../../actions/data/onConnect';

describe('onConnect', () => {
  it('returns', async () => {
    await onConnect(1000);
  });
});
