import React from 'react';
import { useSnapshot } from 'valtio';
import { UseApp } from './Dev';
import { store } from './store';

export function AppLoader(props: { children: React.ReactNode }) {
  const { apps } = useSnapshot(store);

  if (apps == null) {
    console.warn('AppLoader: apps is null');
    return null;
  }

  console.log({ apps });

  const app = apps[Object.keys(apps)?.[0]];

  if (app == null) {
    console.warn('AppLoader: app is null');
    return null;
  }

  return <UseApp app={app}>{props.children}</UseApp>;
}
