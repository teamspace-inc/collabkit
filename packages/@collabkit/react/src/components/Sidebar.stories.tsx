import type { StoryDecorator } from '@ladle/react';
import { nanoid } from 'nanoid';
import React, { ReactNode } from 'react';
import { CollabKitProvider, SidebarInbox, SidebarInboxButton, ThemeProvider, Thread } from '..';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

const FixedSize = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 292, height: 300 }}>{children}</div>
);

const newThreadId = nanoid();

export const Sidebar = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
         <SidebarInboxButton />
          <SidebarInbox />
        </CollabKitProvider>
        <CollabKitProvider {...config} user={{ id: 'bob', name: 'Bob' }}>
          
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);
