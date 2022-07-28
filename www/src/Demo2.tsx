import { styled } from '@stitches/react';
import * as CollabKit from '../../packages/@collabkit/react/src/index';
import { DemoUI } from './DemoUI';
import dashUISvg from './dash-ui.svg';

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

export function Demo2() {
  return (
    <div style={{ width: '100vw' }}>
      <CollabKit.Provider
        mode={'demo'}
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
  );
}
