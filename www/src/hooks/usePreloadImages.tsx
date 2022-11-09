import { useEffect } from 'react';

export function usePreloadImages(props: { imageUrls: string[] }) {
  useEffect(() => {
    setTimeout(() => {
      props.imageUrls.forEach((url) => (new Image().src = url));
    }, 2000);
  }, []);
}
