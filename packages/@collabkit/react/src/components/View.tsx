import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ViewContextValue = {
  viewId: string;
  url: string;
};

const ViewContext = createContext<ViewContextValue | null>(null);

export function useOptionalViewContext() {
  return useContext(ViewContext);
}

export function useViewContext() {
  const viewContext = useContext(ViewContext);
  if (!viewContext) {
    throw new Error('ViewContext not found');
  }
  return viewContext;
}

export function View(props: { viewId: string; children: React.ReactNode; url?: string }) {
  const { viewId } = props;
  const [url, setUrl] = useState(props.url ?? window.location.href);

  const handlePopState = useCallback(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!props.url) {
      window.addEventListener('popstate', handlePopState);
    }
  }, [props.url]);

  return <ViewContext.Provider value={{ viewId, url }}>{props.children}</ViewContext.Provider>;
}
