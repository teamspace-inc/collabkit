import type { StoryDecorator } from '@ladle/react';
import { nanoid } from 'nanoid';
import React, { ReactNode } from 'react';
import { CollabKitProvider, SidebarInbox, SidebarInboxButton, ThemeProvider, Thread } from '..';
import { SidebarThreadsInbox } from './SidebarThreadsInbox';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

const FixedSize = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 292, height: 300 }}>{children}</div>
);

const newThreadId = nanoid();

export const SidebarThreads = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
         <SidebarInboxButton />
          <SidebarThreadsInbox />
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);
