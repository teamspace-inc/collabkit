import React from 'react';
import { CollabKitProvider, Sidebar, SidebarInboxButton } from '../index';
import { Channel } from './Channel';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

export const Channels = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
          <SidebarInboxButton />
          <Sidebar>
            <Channel />
          </Sidebar>
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);
