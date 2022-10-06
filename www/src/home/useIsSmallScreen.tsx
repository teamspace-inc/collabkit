import { useWindowSize } from '../hooks/useWindowSize';

export function useIsSmallScreen() {
  const windowSize = useWindowSize();
  const isSmallScreen = (windowSize?.width ?? 1000) < 720;
  return isSmallScreen;
}
