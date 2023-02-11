import { it, describe, expect } from 'vitest';
import { fetchApp } from '../../../actions/data/fetchApp';

describe('fetchApp', () => {
  it('fetches an app', async () => {
    expect(await fetchApp({ appId: 'h9UlqR5HPxigSOoj--yL3' })).toStrictEqual({
      app: {
        admins: {
          FSYngynSD1QA1c8LqYGWq6YH9vf2: true,
        },
        emailBatchDelayMs: 300000,
        isEmailDisabled: true,
        keys: {
          ea7Q5CcwNTPYkZUVy9J5E: true,
        },
        mode: 'UNSECURED',
        name: 'Test App',
      },
    });
  });
});
