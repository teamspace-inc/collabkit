import { useWindowSize } from '../hooks/useWindowSize';

export function useIsSmallScreen() {
  return (useWindowSize()?.width ?? 1000) <= 768;
}
