import * as CollabKit from '../../packages/@collabkit/react/src/index';
import { DemoUI } from './DemoUI';

export function Demo1() {
  return (
    <CollabKit.Provider
      mode={'demo'}
      readOnly={true}
      apiKey={import.meta.env.VITE_COLLABKIT_TOKEN}
      appId={import.meta.env.VITE_COLLABKIT_APP_ID}
      workspace={{ id: 'acme', name: 'ACME' }}
      user={{
        userId: 'anon-1',
        name: 'Jane Doe',
        email: 'anon@example.com',
      }}
      colorScheme={'dark'}
      mentionableUsers={[]}
    >
      <CollabKit.Commentable style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
          }}
        >
          <span style={{ position: 'relative' }}>
            <DemoUI style={{ width: '90vw', maxWidth: '1352px' }} />
            <CollabKit.FloatingButton
              style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 99 }}
            />
          </span>
        </div>
      </CollabKit.Commentable>
    </CollabKit.Provider>
  );
}
