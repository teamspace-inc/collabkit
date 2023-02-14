// reads app details from url params
export function useAppParams() {
  let params: { [key: string]: string | null | undefined } = {
    apiKey: null,
    appId: null,
    workspaceId: null,
    workspaceName: null,
  };
  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
  }
  const config = {
    apiKey: params.apiKey ?? import.meta.env.VITE_COLLABKIT_API_KEY,
    appId: params.appId ?? import.meta.env.VITE_COLLABKIT_APP_ID,
    workspaceId: params.workspaceId ?? import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
    workspaceName: params.workspaceName ?? import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
  };
  return config;
}
