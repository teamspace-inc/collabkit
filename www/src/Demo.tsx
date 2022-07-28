import UI from './UI.svg';
import * as CollabKit from '../../packages/@collabkit/react/src/index';

export function Demo() {
  return (
    <div style={{ width: '100vw' }}>
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
              <img className="demoImage" style={{ maxWidth: '90vw' }} src={UI} />
              <CollabKit.FloatingButton
                style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 99 }}
              />
            </span>
          </div>
        </CollabKit.Commentable>
      </CollabKit.Provider>
    </div>
  );
}
