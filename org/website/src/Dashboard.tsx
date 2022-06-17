import { signOut } from 'firebase/auth';
import { useSnapshot } from 'valtio';
import { store, auth, events } from './App';
import { styled } from '@stitches/react';
import { AppListItem } from './AppListItem';
import { mint, mauve } from '@radix-ui/colors';
import { Preview } from './Preview';

const VStack = styled('div', {
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

const Center = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '100%',
  height: '80vh',
});

const Grid = styled('div', {
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

const Inset = styled('div', {
  padding: '2rem 2rem',
});

export const Code = styled('code', {
  fontFamily: 'Roboto Mono',
});

const Button = styled('button', {
  variants: {
    type: {
      cta: {
        fontSize: 18,
        lineHeight: '18px',
        border: 'none',
        padding: '1rem',
        fontWeight: 600,
        backgroundColor: mint.mint10,
      },
    },
  },
});

function Hero() {
  return (
    <Grid layout="col1">
      <Inset>
        <Center>
          <VStack>
            <h1
              style={{
                fontFamily: 'Prompt',
                fontSize: '4rem',
                lineHeight: '1',
                color: mauve.mauve1,
              }}
            >
              Add collaboration to your web app.
            </h1>
            <p style={{ fontSize: 20 }}>
              Help your users collaborate with their teammates, inside of your app, instead of
              losing them to Slack, Microsoft Teams or email. <br />
            </p>
            <p style={{ fontSize: 20 }}>
              Integerate our React SDK to start driving retention and engagement
            </p>
            <Button type="cta">Get started</Button>
          </VStack>
        </Center>
      </Inset>
    </Grid>
  );
}

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

function CurrentUser() {
  const { user } = useSnapshot(store);

  return (
    <HStack style={{ gap: '6px' }}>
      <img src={user?.photoURL || ''} /> {user?.displayName} {user?.email ?? 'Anonymous'}
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </HStack>
  );
}

export function Dashboard() {
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
    <div>
      <div style={{ padding: '2rem' }}>
        <HStack>
          <b>CollabKit</b>
          <Spacer />
          <CurrentUser />
        </HStack>
      </div>

      <Hero />
      <HowItWorks />
      <DetailedWhy />
      <Integrate />
      <Pricing />

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
      <h2>Your apps</h2>
      {appList}
      <button onClick={events.onCreateAppButtonClick}>Create new app</button>
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
