import * as CollabKit from '@collabkit/react';
import { styled } from '@stitches/react';
import { useWindowSize } from '@collabkit/react/src/hooks/useWindowSize';
import { DemoUI } from './DemoUI';
import { DemoImageMobileFallback } from './Home';
import DemoMobileImage from './image_02.png';
import { createDemoStore, mentionableUsers } from './store';

const defaultWorkspace: Partial<CollabKit.Workspace> = {
  pins: {
    B0ENawPadDHvTyyILKWz2: {
      createdAt: 1658843343088,
      createdById: 'alicia-1',
      offset: { x: 0.5791564580251479, y: 0.7686934621710526 },
      selector: '#demo-1-ui',
      state: 'open',
      url: '/',
    },
    IdNMQ8uP07YfJtxyNqH28: {
      createdAt: 1658843169471,
      createdById: 'dom-1',
      offset: { x: 0.5128657775517751, y: 0.29183799342105265 },
      selector: '#demo-1-ui',
      state: 'open',
      url: '/',
    },
    ssuGX9o7kJEE7SeSEhVvR: {
      createdAt: 1658842883088,
      createdById: 'ville-1',
      offset: { x: 0.2997497919748521, y: 0.5798673930921052 },
      selector: '#demo-1-ui',
      state: 'open',
      url: '/',
    },
  },
  timeline: {
    B0ENawPadDHvTyyILKWz2: {
      '-N7ul9YUhGqMcZnBhpUh': {
        body: 'Orders are holding strong. Must be an ACV problem.',
        createdAt: 1658843343088,
        createdById: 'alicia-1',
        type: 'message',
      },
    },
    IdNMQ8uP07YfJtxyNqH28: {
      '-N7ukV90v5j3inGLNQt3': {
        body: 'Revenue looks great here, any ideas on the downturn afterwards?',
        createdAt: 1658843169471,
        createdById: 'dom-1',
        type: 'message',
      },
      '-N7ukaiRfiQ7wmutPzc-': {
        body: 'I think it might have been a stock issue!',
        createdAt: 1658843196463,
        createdById: 'greta-1',
        type: 'message',
      },
    },
    ssuGX9o7kJEE7SeSEhVvR: {
      '-N7ujPE4Y1ZsPANNeb3I': {
        body: "I'm so glad we're tracking this, great work setting up this dashboard.",
        createdAt: 1658842883088,
        createdById: 'ville-1',
        type: 'message',
      },
    },
  },
  seen: {
    ssuGX9o7kJEE7SeSEhVvR: '-N7ujPE4Y1ZsPANNeb3I',
    IdNMQ8uP07YfJtxyNqH28: '-N7ukV90v5j3inGLNQt3',
    B0ENawPadDHvTyyILKWz2: '-N7ul9YUhGqMcZnBhpUh',
    sxG87Sq0t3HHG0ghJMaXu: '-N84KobQKUnix1nNkMH-',
  },
};

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

const store = createDemoStore(config, 'collabkit-demo-1', defaultWorkspace);

export function Demo1() {
  const size = useWindowSize();
  return (size?.width ?? 0) > 640 ? (
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
            <DemoUI id="demo-1-ui" style={{ width: '90vw', maxWidth: '1352px' }} />
            <CollabKit.FloatingButton
              style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 99 }}
            />
          </span>
        </div>
        <CommentableCaption style={{ top: '2rem', left: '2rem' }}>
          {'<Commentable />'}
        </CommentableCaption>
        {/* <PresenceCaption style={{ top: '2rem', right: '2rem' }}>{'<Presence />'}</PresenceCaption> */}
        <CommentButtonCaption style={{ bottom: 'calc(2rem + 60px)', right: '2rem' }}>
          {'<CommentButton />'}
        </CommentButtonCaption>
      </CollabKit.Commentable>
    </CollabKit.Provider>
  ) : (
    <DemoImageMobileFallback src={DemoMobileImage} />
  );
}

const OverlayedCaption = styled('span', {
  position: 'absolute',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1.25rem',
  lineHeight: '2.125rem',
  textAlign: 'center',
  letterSpacing: '-0.03em',
});

const CommentableCaption = styled(OverlayedCaption, {
  /* Crimson */
  color: '#E25982',
});

// const PresenceCaption = styled(OverlayedCaption, {
//   /* Sky */
//   color: '#92E4FD',
// });

const CommentButtonCaption = styled(OverlayedCaption, {
  /* Lime */
  color: '#C9EB59',
});
