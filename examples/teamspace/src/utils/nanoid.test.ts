import { nanoid } from './nanoid';

const URL_SAFE_REGEX = /^[a-zA-Z0-9_-]*$/;

it('generates 24 character URL-safe IDs', () => {
  const id = nanoid();
  expect(id).toMatch(URL_SAFE_REGEX);
  expect(id.length).toBe(24);
});
