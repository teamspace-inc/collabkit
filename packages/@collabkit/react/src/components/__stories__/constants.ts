export const config = {
  apiKey: import.meta.env.VITE_COLLABKIT_API_KEY,
  appId: import.meta.env.VITE_COLLABKIT_APP_ID,
  workspace: {
    id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
    name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
  },
  user: {
    name: 'Alice',
    id: 'alice',
  },
  mentionableUsers: 'allWorkspace',
  theme: 'dark' as 'dark' | 'light',
} as const;
