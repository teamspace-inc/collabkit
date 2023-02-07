export const API_HOST =
  process.env.GCLOUD_PROJECT === 'collabkit-dev'
    ? 'https://api.collabkit.dev'
    : 'https://test-api.collabkit.dev';
