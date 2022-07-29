import UI from './UI.svg';
import * as CollabKit from '../../packages/@collabkit/react/src/index';
import DemoMobileImage from './image_01.png';
import { DemoImageMobileFallback } from './Home';
import { createDemoStore } from './store';

const config: CollabKit.Config = {
  mode: 'demo',
  apiKey: 'DUMMY_API_KEY_FOR_DEMO',
  appId: 'DUMMY_APP_ID_FOR_DEMO',
  workspace: { id: 'acme', name: 'ACME' },
  user: {
    userId: 'anon-1',
    name: 'Jane Doe',
    email: 'anon@example.com',
  },
  mentionableUsers: [],
};

const store = createDemoStore(config);

export function Demo() {
  return (
    <div style={{ width: '100vw' }}>
      {window.innerWidth > 480 ? (
        <CollabKit.Provider _demoStore={store} colorScheme={'dark'} {...config}>
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
      ) : (
        <DemoImageMobileFallback src={DemoMobileImage} />
      )}
    </div>
  );
}
