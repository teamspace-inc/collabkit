import type { StoryDecorator } from '@ladle/react';
import { nanoid } from 'nanoid';
import React, { ReactNode } from 'react';
import { CollabKitProvider, SidebarInbox, SidebarInboxButton, ThemeProvider, Thread } from '..';
import { ChannelsInbox } from './ChannelsInbox';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

export const Channels = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
          <SidebarInboxButton />
          <ChannelsInbox />
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);
