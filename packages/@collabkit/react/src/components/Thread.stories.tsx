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

export const DarkTheme = () => (
  <>
    <ThemeProvider theme="dark">
      <FixedSize>
        <Thread threadId="thread-stories" />
      </FixedSize>
    </ThemeProvider>
  </>
);

export const ShowHeader = () => (
  <FixedSize>
    <Thread threadId="thread-stories" showHeader />
  </FixedSize>
);

export const AutoFocusOff = () => (
  <FixedSize>
    <Thread threadId="thread-stories" autoFocus={false} />
  </FixedSize>
);

export const HideComposer = () => (
  <FixedSize>
    <Thread threadId="thread-stories" hideComposer={true} />
  </FixedSize>
);

export const ThreadInfoName = () => (
  <FixedSize>
    <Thread threadId="thread-stories" info={{ name: 'Thread Stories' }} />
  </FixedSize>
);

export const ThreadInfoURL = () => (
  <FixedSize>
    <Thread threadId="thread-stories" info={{ url: 'https://localhost:61000/something' }} />
  </FixedSize>
);

export const DefaultSubscribers = () => (
  <FixedSize>
    <Thread threadId="thread-stories" defaultSubscribers={['user1']} />
  </FixedSize>
);

export const CustomPlaceholder = () => (
  <FixedSize>
    <Thread threadId="thread-stories" placeholder="custom placeholder here" />
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
