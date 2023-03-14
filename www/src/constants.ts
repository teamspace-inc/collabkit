import { nanoid } from 'nanoid';

export const apiKey = import.meta.env.VITE_COLLABKIT_UNSECURE_API_KEY;
export const appId = import.meta.env.VITE_COLLABKIT_UNSECURE_APP_ID;
export const workspace = {
  id: nanoid(),
  name: 'Acme',
};
export const userId = nanoid();
