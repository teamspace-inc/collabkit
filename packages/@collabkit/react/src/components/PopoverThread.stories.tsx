import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { PopoverThread } from './PopoverThread';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { DefaultProviderProps, ProviderPropsContext } from './__stories__/context';
import { useUnreadCommentsCount } from '../hooks/public/useUnreadCommentsCount';
import { CollabKitProvider } from './Provider';

const objectId = 'object-1';

export function Popover() {
  const { showThread } = usePopoverThread({ objectId })
  return <div>
    <PopoverThread objectId={objectId}>
      <button onClick={() => showThread()}>Show Thread</button>
    </PopoverThread>
  </div>
};

export const UnreadCount = () => {
  const objectId = 'object-1';
  const unreadCount = useUnreadCommentsCount({objectId: objectId});
  const { showThread } = usePopoverThread({ objectId })
  return <div>
    <ProviderPropsContext.Consumer>
      {(config: DefaultProviderProps) => (
        <>
          <CollabKitProvider {...config} user={{ id: 'alice', name: 'Alice' }}>
            Alice :
            <br /> <br />
            <PopoverThread objectId={objectId}>
              <button onClick={() => showThread()}>Show Thread</button>
            </PopoverThread>
            <p>Unread count : {unreadCount}</p>

          </CollabKitProvider>
            Bob :
            <br /> <br />
          <CollabKitProvider {...config} user={{ id: 'bob', name: 'Bob' }}>
            <PopoverThread objectId={objectId}>
              <button onClick={() => showThread()}>Show Thread</button>
            </PopoverThread>
          </CollabKitProvider>
        </>
      )}
    </ProviderPropsContext.Consumer>
  </div>
};

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
