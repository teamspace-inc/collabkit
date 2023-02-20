import React from 'react';
import { CollabKitProvider, Sidebar, SidebarInboxButton } from '../index';
import { SidebarChannel } from './Channel';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

export const Channels = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
          <SidebarInboxButton />
          <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
            <SidebarChannel />
          </div>
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);
