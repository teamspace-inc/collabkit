import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { PopoverThread, PreviewThread } from './popover';
import { CollabKitProvider } from './Provider';
import { config } from './__stories__/constants';

const threadId = 'PopoverThread-stories';

export const Preview = () => <PreviewThread threadId={threadId} />;
export const Thread = () => <PopoverThread threadId={threadId} />;

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
    <PopoverThread threadId={threadId} />
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
