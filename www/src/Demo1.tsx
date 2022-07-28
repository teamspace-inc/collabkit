import * as CollabKit from '@collabkit/react';
import { DemoUI } from './DemoUI';
import { DemoImageMobileFallback } from './Home';
import DemoMobileImage from './image_02.png';
import { createDemoStore } from './store';

const config: CollabKit.Config = {
  mode: 'demo',
  readOnly: true,
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

export function Demo1() {
  return window.innerWidth > 480 ? (
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
            <DemoUI style={{ width: '90vw', maxWidth: '1352px' }} />
            <CollabKit.FloatingButton
              style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 99 }}
            />
          </span>
        </div>
      </CollabKit.Commentable>
    </CollabKit.Provider>
  ) : (
    <DemoImageMobileFallback src={DemoMobileImage} />
  );
}
