export function useTestParams() {
  const params = new URLSearchParams(window.location.search);
  return params.get('test') === 'true';
}
