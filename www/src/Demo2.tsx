import { styled } from '@stitches/react';
import * as CollabKit from '@collabkit/react';
import { DemoUI } from './DemoUI';
import dashUISvg from './dash-ui.svg';
import DemoMobileImage from './image_03.png';
import { DemoImageMobileFallback } from './Home';
import { createDemoStore } from './store';

const Modal = styled('div', {
  position: 'absolute',
  inset: 0,
  margin: '6rem 12rem',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  borderRadius: 8,
  overflow: 'hidden',
});

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

export function Demo2() {
  return window.innerWidth > 480 ? (
    <div style={{ width: '100vw' }}>
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
              <Modal>
                <img src={dashUISvg} style={{ margin: '3.75rem' }} />
                <CollabKit.Thread
                  threadId={'demo2'}
                  style={{
                    borderRadius: 0,
                  }}
                />
              </Modal>
            </span>
          </div>
        </CollabKit.Commentable>
      </CollabKit.Provider>
    </div>
  ) : (
    <DemoImageMobileFallback src={DemoMobileImage} />
  );
}
