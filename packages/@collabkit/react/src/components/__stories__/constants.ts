export const config = {
  apiKey: import.meta.env.VITE_COLLABKIT_API_KEY,
  appId: import.meta.env.VITE_COLLABKIT_APP_ID,
  workspace: {
    id: 'ladle',
    name: 'Ladle workspace',
  },
  user: {
    name: 'Ladle User',
    id: 'ladle',
  },
  mentionableUsers: 'allWorkspace',
  theme: 'dark' as 'dark' | 'light',
} as const;
