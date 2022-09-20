import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { PopoverThread, PreviewThread } from './PopoverThread';
import { useApp } from '../hooks/useApp';
import { FlexCenter } from './UIKit';

const threadId = 'PopoverThread-stories';

export const Preview = () => <PreviewThread threadId={threadId} />;
export const Thread = () => <PopoverThread threadId={threadId} />;

export default {
  decorators: [
    (Component) => {
      const { theme } = useApp();
      return (
        <FlexCenter>
          <div className={theme.className}>
            <Component />
          </div>
        </FlexCenter>
      );
    },
  ] as StoryDecorator[],
};
