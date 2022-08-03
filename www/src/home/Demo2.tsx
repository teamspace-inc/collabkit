import { styled } from '@stitches/react';
import * as CollabKit from '@collabkit/react';
import { DemoUI } from './DemoUI';
import dashUISvg from '../assets/dash-ui.svg';
import DemoMobileImage from '../assets/image_03.png';
import { DemoImageMobileFallback } from './Home';
import { createDemoStore, mentionableUsers } from './demoStore';
import { useWindowSize } from '@collabkit/react/src/hooks/useWindowSize';

const defaultWorkspace: Partial<CollabKit.Workspace> = {
  pins: {},
  timeline: {
    demo2: {
      'tI4-CwJy7-Iu2OYdQmjZJ': {
        type: 'message',
        body: 'Hey [Sara](@Sarah Donner)! Here is our breakdown of revenue in the H1 days.',
        createdAt: Date.now() - 1000 * 60 * 30,
        createdById: 'john',
      },
      gFUbr6rd416TQjaow3Cxk: {
        type: 'message',
        body: 'Thanks [John](@John Doe). I’ll look over these and get back to you!',
        createdAt: Date.now() - 1000 * 60 * 15,
        createdById: 'sara',
      },
      'Ev8fN_K1SIVBJcWOR5l-0': {
        type: 'message',
        body: '[John](@John Doe) Wondering why the revenue in March was so low? I was expecting a much larger upturn on the run up to the holidays',
        createdAt: Date.now() - 1000 * 60 * 10,
        createdById: 'sara',
      },
      ehPG4U6Ggsw2VOIEG_WWt: {
        type: 'message',
        body: 'From the looks of it, our systems were down and a lot of staff were already taking time off so we had a staff shortage!',
        createdAt: Date.now(),
        createdById: 'tamar',
      },
    },
  },
  seen: { demo2: 'tI4-CwJy7-Iu2OYdQmjZJ' },
};

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
  mentionableUsers: mentionableUsers,
};

const store = createDemoStore(config, 'collabkit-demo-2', defaultWorkspace);

export function Demo2() {
  const size = useWindowSize();
  return (size?.width ?? 0) > 1124 && window.chrome ? (
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
                  showHeader={true}
                  threadId={'demo2'}
                  style={{
                    borderRadius: 0,
                    minWidth: 234,
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
