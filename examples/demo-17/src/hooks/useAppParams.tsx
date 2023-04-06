// reads app details from url params
export function useAppParams() {
  const params = new URLSearchParams(window.location.search);
  const config = {
    appId: params.get('appId') ?? import.meta.env.VITE_COLLABKIT_APP_ID,
    token: params.get('token') ?? null,
  };
  return config;
}
