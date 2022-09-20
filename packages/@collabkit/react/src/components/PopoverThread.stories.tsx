import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { PopoverThread } from './PopoverThread';
import { useApp } from '../hooks/useApp';

export const Thread = () => {
  return (
    <PopoverThread
      threadId={'PopoverThread-stories'}
      style={{
        margin: '24px auto',
      }}
    />
  );
};

export default {
  decorators: [
    (Component) => {
      const { theme } = useApp();
      return (
        <div className={theme.className}>
          <Component />
        </div>
      );
    },
  ] as StoryDecorator[],
};
