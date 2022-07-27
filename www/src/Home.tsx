import { styled } from './UIKit';
import Example from './Example.svg';
import CommentAnything from './CommentAnything.svg';
import AnyApp from './AnyApp.svg';
import Realtime from './Realtime.svg';
import Email from './Email.svg';
import ExampleCode from './Example.mdx';
import ChevronDown from './ChevronDown.svg';
import RocketLaunchIcon from './RocketLaunch.svg';
import HandPointingIcon from './HandPointing.svg';
import Cursor from './Cursor.svg';
import Logo from './Logo.svg';
import { Demo } from './Demo';

const Grid = styled('div', {
  display: 'grid',
});

const VStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Text = styled('p', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '140%',
  letterSpacing: '-0.03em,',
  zIndex: 1,
});

const Title = styled('h1', {
  fontFamily: 'Space Grotesk',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '5.5rem',
  lineHeight: '95%',
  textAlign: 'center',
  letterSpacing: '-0.05em',
  color: '#222222',
  margin: '4rem 0 2rem',
  zIndex: 1,

  '@bp1': { marginTop: 0, maxWidth: '90vw', minWidth: '90vw', fontSize: '4rem' },
  '@bp2': { maxWidth: 'unset', minWidth: 'unset', fontSize: '7rem' },
});

const Em = styled('em', {
  // fontFamily: 'Source Serif Pro',
  zIndex: 1,
  fontStyle: 'normal',
});

const Subtitle = styled('h2', {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: '116%',
  letterSpacing: '-0.05em',
  zIndex: 1,
});

const Button = styled('button', {
  fontFamily: 'Inter',
  padding: '1rem 2rem',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '100%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
  color: '#FFFFFF',
  background: '#222222',
  borderRadius: 100,
  gap: '10px',
  border: 'none',
  zIndex: 1,
  cursor: 'pointer',
  '&:hover': {
    background: 'black',
  },
});

const Section = styled('section', {
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  width: '100%',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Header = styled('header', {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'stretch',
  flex: 1,
  width: '90vw',
  padding: '0 5vw',
  position: 'fixed',
  zIndex: 2,

  // '@bp1': { marginTop: '1rem', flexDirection: 'column', alignItems: 'flex-start' },
});

const Link = styled('a', {
  fontSize: '1.25rem',
  textDecoration: 'none',
  color: 'black',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Circle = styled('div', {
  aspectRatio: 1,
  minWidth: '40rem',
  maxWidth: '40rem',
  borderRadius: '50%',
  background: '#FFEC6B',
  zIndex: 0,

  '@bp1': { maxWidth: '90vw', minWidth: '90vw', width: '90vw' },
  '@bp2': { minWidth: '40rem', maxWidth: '50rem', width: 'unset' },

  variants: {
    color: {
      yellow: {
        background: '#FFEC6B',
      },
      purple: {
        background: '#905EC9',
      },
      sky: {
        background: '#92E4FD',
      },
      pink: {
        background: '#D556A1',
      },
      amber: {
        background: '#FBC858',
      },
      indigo: {
        background: '#4D71DF',
      },
    },
  },
});

const Article = styled('article', {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '20rem 27.5rem',
  columnGap: '8rem',
  border: '2px solid #222222',
  borderRadius: '1.25rem',
  maxWidth: '20rem',

  img: {
    // width: '100%',
    maxWidth: '100%',
  },

  '@bp1': {
    padding: '2rem',
    gridTemplateColumns: '1fr',
  },
  '@bp2': {
    padding: '4rem',
    gridTemplateColumns: '1fr',
  },
});

const BoostActivationLayout = styled('div', {
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'minmax(20rem, 60rem) 20rem',
  columnGap: '4rem',
  width: 'calc(100vw - 4rem)',

  '@bp1': {
    gridTemplateColumns: '1fr',
    rowGap: '4rem',
  },
  '@bp2': {
    gridTemplateColumns: 'minmax(20rem, 60rem) 20rem',
  },
});

const RequestDemoButton = (
  <Button
    onClick={() => (window.location.href = 'https://calendly.com/namit-chadha/30min?month=2022-07')}
  >
    Request a demo
  </Button>
);

// const BoostActivation = (
//   <Section
//     style={{
//       background: '#9FEFD7',
//     }}
//   >
//     <BoostActivationLayout>
//       <img src={Example} style={{ width: '100%', maxWidth: '743px' }} />
//       <VStack>
//         <Subtitle>
//           Boost activation <br />
//           and retention
//         </Subtitle>
//         <Text>
//           Give contextual feedback, onboard coworkers or even leave tips on how to use your product
//           all in real time.
//           <br />
//           <br />
//           <b>
//             With CollabKit, you can figure <br />
//             things out as a team.
//           </b>
//         </Text>
//       </VStack>
//     </BoostActivationLayout>
//   </Section>
// );

const StickyHeader = (
  <Header style={{ marginTop: '1rem' }}>
    <div style={{ display: 'flex', flex: 1 }}>
      <img src={Logo} style={{ height: '1.5rem' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
      {window.innerWidth > 480 ? (
        <Text>
          <Link href="https://discord.gg/UCA4CbZad4">Discord</Link>
        </Text>
      ) : null}
      <div style={{ position: 'relative', top: window.innerWidth > 480 ? '0.5rem' : 0 }}>
        {RequestDemoButton}
      </div>
    </div>
  </Header>
);

const BoostActivation = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      padding: '4rem 0',
    }}
  >
    <img style={{ width: '6rem', marginBottom: '2rem' }} src={RocketLaunchIcon} />
    <Subtitle>Boost activation and retention</Subtitle>
    <Text style={{ maxWidth: '40rem', textAlign: 'center' }}>
      Give contextual feedback, onboard coworkers or even leave tips on how to use your product all
      in real time
    </Text>
  </div>
);

const TryItOut = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem 0',
    }}
  >
    <img style={{ width: '6rem', marginBottom: '2rem' }} src={HandPointingIcon} />
    <Subtitle>Try it out</Subtitle>
    <Text style={{ maxWidth: '50rem', textAlign: 'center' }}>
      Click anywhere to leave a comment or reply to an existing one
    </Text>
  </div>
);

const Hero = (
  <Section
    style={{
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: '1fr',
        columnGap: '0',
      }}
    >
      {/* <Circle color="sky" style={{ transform: 'translateX(-33%)' }} /> */}
      <Circle
        color="yellow"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <VStack style={{ margin: '3rem -6rem 0' }}>
          <Title>
            Add commenting to <br />
            <Em>your</Em> product
          </Title>
          <Text style={{ textAlign: 'center' }}>
            It only takes minutes, with our
            <br /> customisable React SDK.
          </Text>
        </VStack>
        <img style={{ position: 'absolute', bottom: 0, right: 0 }} src={Cursor} />
      </Circle>
      {/* <Circle color="purple" style={{ transform: 'translateX(33%)' }} /> */}
    </Grid>
    <img
      src={ChevronDown}
      style={{
        position: 'absolute',
        left: '50%',
        marginLeft: -14,
        bottom: 'calc((100vh - 40rem)/4)',
      }}
    />
  </Section>
);

// const ContextualConversations = (
//   <Section
//     style={{
//       position: 'relative',
//       overflow: 'hidden',
//       minHeight: '55rem',
//     }}
//   >
//     <Grid
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         gridTemplateColumns: 'repeat(3, 1fr)',
//         columnGap: '0',
//       }}
//     >
//       <Circle color="pink" style={{ transform: 'translateX(-33%)' }} />
//       <Circle
//         color="amber"
//         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//       >
//         <VStack style={{ margin: '0 -5rem' }}>
//           <Title>
//             Have conversations with <Em>context</Em>
//           </Title>
//           <Text style={{ textAlign: 'center' }}>
//             CollabKit works just like commenting in
//             <br /> Figma, Google Docs and Notion.
//           </Text>
//         </VStack>
//       </Circle>
//       <Circle color="indigo" style={{ transform: 'translateX(33%)' }} />
//     </Grid>
//   </Section>
// );

export function Home() {
  return (
    <div>
      {StickyHeader}
      {Hero}
      {BoostActivation}
      {TryItOut}
      {/* {ContextualConversations} */}
      <Demo />
      <Section
        style={{
          marginTop: '6rem',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#EDF5F7',
        }}
      >
        <div style={{ marginTop: '10rem', maxWidth: '50rem', textAlign: 'center' }}>
          <Title style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Conversations with context
          </Title>
          <Text>CollabKit works just like commenting in Figma, Google Docs &amp; Notion</Text>
        </div>
        <Grid
          style={{
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            marginTop: '4rem',
            padding: '4rem 4rem 8rem',
          }}
        >
          <Article>
            <div style={{ width: '100%' }}>
              <img src={CommentAnything} />
            </div>
            <VStack>
              <Subtitle>Comment on anything</Subtitle>
              <Text>
                Have discussions in context. Conversations about that sale, product, invoice or
                customer all happen in the same place.
              </Text>
            </VStack>
          </Article>
          <Article>
            <div style={{ width: '100%' }}>
              <img src={AnyApp} />
            </div>
            <VStack>
              <Subtitle>In any type of app</Subtitle>
              <Text>
                CollabKit Works across all kinds of interfaces; CRMs, documents, analytics
                dashboards, calendars and more...
              </Text>
            </VStack>
          </Article>
          <Article>
            <div style={{ width: '100%' }}>
              <img src={Realtime} style={{ width: window.innerWidth < 480 ? '100%' : '87%' }} />
            </div>
            <VStack>
              <Subtitle>All in real time</Subtitle>
              <Text>
                See who’s online, who’s typing and keep the conversation going without ever leaving
                your product.
              </Text>
            </VStack>
          </Article>
          <Article>
            <div style={{ width: '100%' }}>
              <img src={Email} />
            </div>
            <VStack>
              <Subtitle>Get notified by email</Subtitle>
              <Text>
                New comments are sent straight to your inbox. Reply directly via email or click
                through to the comment thread.
              </Text>
            </VStack>
          </Article>
        </Grid>
      </Section>
      <Section
        style={{
          background: '#343643',
          color: 'white',
        }}
      >
        <VStack style={{ textAlign: 'center', marginTop: '-8rem' }}>
          <Title style={{ color: 'white' }}>
            Why <Em>build</Em> it?
          </Title>
          <Text>CollabKit React SDK integrates in minutes.</Text>
        </VStack>
        <br />
        <br />
        <br />
        <br />
        <Article>
          <VStack>
            <Subtitle>
              Let us do the {window.innerWidth < 480 ? null : <br />}
              hard work
            </Subtitle>
            <Text>
              Install our customisable React SDK and add real time collaboration to your product in
              no time.
            </Text>
          </VStack>
          <div style={{ marginTop: window.innerWidth < 480 ? 0 : '-16rem' }}>
            <ExampleCode />
          </div>
        </Article>
      </Section>
      <Section style={{ background: '#905EC9' }}>
        <Circle color="yellow">
          <VStack
            style={{
              marginTop: '12rem',
              marginLeft: '-4rem',
              marginRight: '-4rem',
              justifyContent: 'center',
            }}
          >
            <Title>
              Get <Em>started</Em> now
            </Title>
            <Text style={{ textAlign: 'center' }}>Schedule a chat with our team</Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '3rem',
              }}
            >
              <VStack>{RequestDemoButton}</VStack>
            </div>
          </VStack>
        </Circle>
      </Section>
    </div>
  );
}
