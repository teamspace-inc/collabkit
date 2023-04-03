import { useEffect } from 'react';
import { UIState } from 'state/constants';

export default function useCursor(uiState: UIState) {
  useEffect(() => {
    switch (uiState) {
      case 'panning.idle':
        document.body.style.cursor = 'grab';
        break;
      case 'panning.pointing':
        document.body.style.cursor = 'grabbing';
        break;
      case 'text.idle':
      case 'sticky.idle':
      case 'card.idle':
        document.body.style.cursor = 'crosshair';
        break;
      default:
        document.body.style.cursor = 'default';
        break;
    }
  }, [uiState]);
}
