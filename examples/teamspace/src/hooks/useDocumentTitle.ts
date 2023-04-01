import { useCallback, useEffect } from 'react';
import { XmlFragment } from 'yjs';

export default function useDocumentTitle(fragment: XmlFragment | undefined, defaultTitle: string) {
  const setTitle = useCallback(() => {
    const name = fragment?.toDOM().textContent;
    document.title = name ? `${name} | ${defaultTitle}` : defaultTitle;

    const url = new URL(location.toString());
    url.hash = name ? name : '';
    history.replaceState(null, '', url);
  }, [fragment, defaultTitle]);

  useEffect(() => {
    if (!fragment) {
      return;
    }
    setTitle();
    fragment.observeDeep(setTitle);

    return () => {
      document.title = defaultTitle;
      fragment.unobserveDeep(setTitle);
    };
  }, [fragment, defaultTitle]);
}
