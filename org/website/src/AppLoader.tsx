import React from 'react';
import { useSnapshot } from 'valtio';
import { Dev } from './Dev';
import { store } from './store';

export function AppLoader(props: { children: React.ReactNode }) {
  const { apps } = useSnapshot(store);

  if (apps == null) {
    return null;
  }

  const app = apps[Object.keys(apps)?.[0]];

  if (app == null) {
    return null;
  }

  return <Dev app={app}>{props.children}</Dev>;
}
