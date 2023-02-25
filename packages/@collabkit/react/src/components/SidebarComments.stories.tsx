import React from 'react';
import {
  CollabKitProvider,
  SidebarComments as SidebarCommentsComponent,
  ToggleSidebarCommentsButton,
} from '../index';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

export const SidebarComments = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
          <ToggleSidebarCommentsButton />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <SidebarCommentsComponent />
          </div>
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);
