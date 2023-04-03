import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { ConnectionState } from 'state/constants';

function notify(text: string, className: string) {
  toast(text, {
    className: `toast ${className}`,
    position: 'top-right',
  });
}

export default function useNotifications(connectionState: ConnectionState, saved: number) {
  const lastConnectionState = useRef('new');
  const lastSaved = useRef(0);

  // take action if it has been over a second
  // and the connection state is still disconnected
  useEffect(() => {
    switch (connectionState) {
      case 'offline': {
        // placeholder text, to revise
        notify('offline', 'offline-notification');
        break;
      }
      case 'online': {
        if (lastConnectionState.current === 'offline') {
          // placeholder text, to revise
          notify('online', 'online-notification');
        }
        break;
      }
    }
    lastConnectionState.current = connectionState;
  }, [connectionState]);

  useEffect(() => {
    if (saved > 0 && lastSaved.current === 0) {
      // placeholder text, to revise
      notify(
        'you have local changes, these will be synced when you are online',
        'local-changes-notification'
      );
    }
    if (lastSaved.current > 0 && saved === 0) {
      // placeholder text, to revise
      notify(
        'now that you are back online your changes have been synced',
        'local-changes-synced-notification'
      );
    }
    lastSaved.current = saved;
  }, [saved === 0]);

  useEffect(() => {
    // @ts-expect-error
    if (!window.chrome) {
      notify(
        'teamspace has limited support for browsers other than Google Chrome',
        'browser-notification'
      );
    }
  }, []);

  return <div />;
}
