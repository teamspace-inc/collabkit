import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { PopoverThread } from './PopoverThread';
import { CollabKitProvider } from './Provider';
import { config } from './__stories__/constants';
import { Thread } from './Thread';

const threadId = 'PopoverThread-stories';

export const PopoverThreadPreviewStory = () => (
  <Thread.Provider threadId={threadId}>
    <PopoverThread.Preview />
  </Thread.Provider>
);
export const PopoverThreadStory = () => (
  <PopoverThread objectId={threadId}>
    <h1>Hello</h1>
  </PopoverThread>
);

const theme = {
  comment: {
    paddingTop: '16px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px',
    timestamp: {
      lineHeight: '153%',
    },
  },
  composer: {
    input: {
      border: '1px solid #E3E9ED',
      padding: '9px 12px',
    },
  },
  popoverThread: {
    border: '1px solid #E3E9ED',
    boxShadow: '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
  },
};

export const ThemedThread = () => (
  <CollabKitProvider {...config} theme={theme}>
    <PopoverThread objectId={threadId}>
      <h1>Popover</h1>
    </PopoverThread>
  </CollabKitProvider>
);

export default {
  decorators: [
    (Component) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Component />
        </div>
      );
    },
  ] as StoryDecorator[],
};
