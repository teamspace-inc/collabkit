import { useSnapshot } from 'valtio';
import { store, events } from './App';
import { styled } from '@stitches/react';
import { AppListItem } from './AppListItem';
import { mint } from '@radix-ui/colors';
import { Preview } from './Preview';
import { CurrentUser } from './CurrentUser';
import { Hero } from './Hero';

export const VStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  align: {
    center: {
      justifyContent: 'center',
    },
  },
});

const Spacer = styled('div', {
  flexGrow: 1,
});

export const HStack = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  variants: {
    align: {
      center: {
        alignItems: 'center',
      },
    },
  },
});

export const Center = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '100%',
  height: '80vh',
});

export const Grid = styled('div', {
  display: 'grid',
  variants: {
    layout: {
      col1: {
        gridTemplateColumns: '1fr',
      },
      col2: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
  },
});

export const Inset = styled('div', {
  padding: '2rem 2rem',
});

export const Code = styled('code', {
  fontFamily: 'Roboto Mono',
});

export const Button = styled('button', {
  cursor: 'pointer',
  borderRadius: 6,
  variants: {
    type: {
      cta: {
        fontSize: '1rem',
        lineHeight: 1,
        padding: '0.5rem',
        fontWeight: 600,
        color: mint.mint1,
        backgroundColor: mint.mint10,
        border: '1px solid red',
        borderColor: mint.mint10,
      },
      secondary: {
        fontSize: '1rem',
        lineHeight: 1,
        padding: '0.5rem',
        color: mint.mint11,
        fontWeight: 600,
        border: '1px solid red',
        borderColor: mint.mint10,
        backgroundColor: 'transparent',
      },
    },
  },
});

function HowItWorks() {
  return <div>How It Works</div>;
}

function Integrate() {
  return <div>Integrate</div>;
}

function Pricing() {
  return <div>Pricing Page</div>;
}

function DetailedWhy() {
  return (
    <div>
      <p>
        Collaboration is the underlying activity driving most workflows and product use for work.
        Stop losing engagement to other products and bring it on platform to drive engagement,
        retention &amp; growth.
      </p>
      {/* <p>
        <b>Contextual collaboration</b>
      </p> */}
      <p>
        If you have 2+ people from the same team or company using your product, adding commenting
        lets them collaborate in your product instead of switching over to Slack, Microsoft Teams or
        Email.
      </p>
    </div>
  );
}

function Apps() {
  const { apps } = useSnapshot(store);
  const appList = (
    <ol>
      {Object.keys(apps).map((id) => (
        <li key={id}>
          <AppListItem app={apps[id]} />
        </li>
      ))}
    </ol>
  );
  const selectedAppId = Object.keys(apps)?.[0];

  return (
    <div style={{ padding: '2rem' }}>
      {/* <h1>Apps</h1>
      {appList}
      <Button type="cta" onClick={events.onCreateAppButtonClick}>
        Create new app
      </Button> */}
      {/* <textarea value={idToken ?? ''} /> */}
      {selectedAppId ? (
        <Preview
          appId={selectedAppId}
          apiKey={Object.keys(apps[selectedAppId].keys)[0]}
          mode={apps[selectedAppId].mode}
        />
      ) : null}
    </div>
  );
}

export function Dashboard() {
  return (
    <div>
      <div style={{ padding: '2rem 2rem 0' }}>
        <HStack>
          <b style={{ fontSize: 20, fontWeight: 500 }}>CollabKit</b>
          <Spacer />
          <CurrentUser />
        </HStack>
      </div>

      {/* <Hero /> */}
      <Apps />
      {/* <HowItWorks /> */}
      {/* <DetailedWhy /> */}
      {/* <Integrate /> */}
      {/* <Pricing /> */}

      {/* <p>
        <b>Public discussions</b>
      </p>
      <p>
        If you have public content, like a video, photo or document. Adding public commenting lets
        others discuss in your product.
      </p>
      <p>
        <b>Feedback on content</b>
      </p>
      <p>
        If your users are creating content in your product. Comments enables others to provide
        feedback in context on work in progress.
      </p> */}
    </div>
  );
}
