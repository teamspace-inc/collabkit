import type { StoryDecorator } from '@ladle/react';
import { nanoid } from 'nanoid';
import React, { ReactNode } from 'react';
import { CollabKitProvider, ThemeProvider, Thread } from '../';
import { ProviderPropsContext, DefaultProviderProps } from './__stories__/context';

const FixedSize = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 292, height: 300 }}>{children}</div>
);

const newThreadId = nanoid();
export const Empty = () => (
  <FixedSize>
    <Thread threadId={newThreadId} />
  </FixedSize>
);

export const Threads = () => (
  <ProviderPropsContext.Consumer>
    {(config: DefaultProviderProps) => (
      <>
        <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
          <FixedSize>
            <Thread threadId="thread-stories" />
          </FixedSize>
        </CollabKitProvider>
        <CollabKitProvider {...config} user={{ id: 'bob', name: 'Bob' }}>
          <FixedSize>
            <Thread threadId="thread-stories" />
          </FixedSize>
        </CollabKitProvider>
      </>
    )}
  </ProviderPropsContext.Consumer>
);

export const WithThemeProvider = () => (
  <>
    <ThemeProvider theme="dark">
      <Thread threadId="thread-stories" />
    </ThemeProvider>
    <ThemeProvider theme="light">
      <Thread threadId="thread-stories" />
    </ThemeProvider>
  </>
);

export const WithHeader = () => (
  <FixedSize>
    <Thread threadId="thread-stories" showHeader />
  </FixedSize>
);

export default {
  decorators: [
    (Component) => (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Component />
      </div>
    ),
  ] as StoryDecorator[],
};
