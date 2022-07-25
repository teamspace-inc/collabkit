import { styled, HStack, VStack, Grid } from './UIKit';
import { getHighlighter, setCDN } from 'shiki';
import Example from './Example.svg';
import CommentAnything from './CommentAnything.svg';
import AnyApp from './AnyApp.svg';
import Realtime from './Realtime.svg';
import Email from './Email.svg';
import { useEffect } from 'react';
import ExampleCode from './Example.mdx';
import ChevronDown from './ChevronDown.svg';

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
});

const Em = styled('em', {
  fontFamily: 'Source Serif Pro',
  zIndex: 1,
  // fontStyle: 'normal',
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
});

const Link = styled('a', {
  textDecoration: 'none',
  color: 'black',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Circle = styled('div', {
  aspectRatio: 1,
  minWidth: '40rem',
  maxWidth: '66vw',
  borderRadius: '50%',
  background: '#FFEC6B',
  zIndex: 0,

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
  marginBottom: '12rem',
  gridTemplateColumns: '20rem 27.5rem',
  columnGap: '8rem',

  img: {
    width: '100%',
  },
});

const RequestDemoButton = (
  <Button
    onClick={() => (window.location.href = 'https://calendly.com/namit-chadha/30min?month=2022-07')}
  >
    Request a demo
  </Button>
);

export function Home() {
  useEffect(() => {
    setCDN('https://unpkg.com/shiki/');
    getHighlighter({
      theme: 'nord',
    })
      .then((highlighter) => {
        const tokens = highlighter.codeToHtml(`console.log('shiki');`, { lang: 'js' });
        console.log('tokens', tokens);
        console.log(tokens);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div style={{}}>
      <Header>
        <div style={{ display: 'flex', flex: 1 }}>
          <h1>CollabKit</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
          <Text>
            <Link href="mailto:namit@collabkit.dev">Contact us</Link>
          </Text>
          <div style={{ position: 'relative', top: '0.5rem' }}>{RequestDemoButton}</div>
        </div>
      </Header>
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
            gridTemplateColumns: '1fr 1fr 1fr',
            columnGap: '0',
          }}
        >
          <Circle color="sky" style={{ transform: 'translateX(-33%)' }} />
          <Circle
            color="yellow"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <VStack style={{ margin: '0 -5rem' }}>
              <Title>
                Add commenting to <br />
                <Em>your</Em> product
              </Title>
              <Text style={{ textAlign: 'center' }}>
                It only takes minutes, with our
                <br /> customisable React SDK.
              </Text>
            </VStack>
          </Circle>
          <Circle color="purple" style={{ transform: 'translateX(33%)' }} />
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
      <Section
        style={{
          background: '#9FEFD7',
        }}
      >
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            gridTemplateColumns: 'minmax(20rem, 60rem) 20rem',
            columnGap: '4rem',
            width: 'calc(100vw - 4rem)',
          }}
        >
          <img src={Example} style={{ width: '100%' }} />
          <VStack>
            <Subtitle>
              Boost activation <br />
              and retention
            </Subtitle>
            <Text>
              Give contextual feedback, onboard coworkers or even leave tips on how to use your
              product all in real time.
              <br />
              <br />
              <b>
                With CollabKit, you can figure <br />
                things out as a team.
              </b>
            </Text>
          </VStack>
        </div>
      </Section>
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '0',
          }}
        >
          <Circle color="pink" style={{ transform: 'translateX(-33%)' }} />
          <Circle
            color="amber"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <VStack style={{ margin: '0 -5rem' }}>
              <Title>
                Have conversations <br />
                with <Em>context</Em>
              </Title>
              <Text style={{ textAlign: 'center' }}>
                CollabKit works just like commenting in
                <br /> Figma, Google Docs and Notion.
              </Text>
            </VStack>
          </Circle>
          <Circle color="indigo" style={{ transform: 'translateX(33%)' }} />
        </Grid>
      </Section>
      <Section style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Article>
          <VStack>
            <Subtitle>Comment on anything</Subtitle>
            <Text>
              Have discussions in context. Conversations about that sale, product, invoice or
              customer all happen in the same place.
            </Text>
          </VStack>
          <div style={{ width: '100%' }}>
            <img src={CommentAnything} />
          </div>
        </Article>
        <Article>
          <VStack>
            <Subtitle>In any type of app</Subtitle>
            <Text>
              CollabKit Works across all kinds of interfaces; CRMs, documents, analytics dashboards,
              calendars and more...
            </Text>
          </VStack>
          <div style={{ width: '100%', position: 'relative', left: -44 }}>
            <img src={AnyApp} style={{ width: '107%' }} />
          </div>
        </Article>
        <Article>
          <VStack>
            <Subtitle>All in real time</Subtitle>
            <Text>
              See who’s online, who’s typing and keep the conversation going without ever leaving
              your product.
            </Text>
          </VStack>
          <div style={{ width: '100%' }}>
            <img src={Realtime} style={{ width: '87%' }} />
          </div>
        </Article>
        <Article>
          <VStack>
            <Subtitle>Get notified by email</Subtitle>
            <Text>
              New comments are sent straight to your inbox. Reply directly via email or click
              through to the comment thread.
            </Text>
          </VStack>
          <div style={{ width: '100%' }}>
            <img src={Email} />
          </div>
        </Article>
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
              Let us do the <br />
              hard work
            </Subtitle>
            <Text>
              Install our customisable React SDK and add real time collaboration to your product in
              no time.
            </Text>
          </VStack>
          <div style={{ marginTop: '-16rem' }}>
            <ExampleCode />
          </div>
        </Article>
      </Section>
      <Section style={{ background: '#905EC9' }}>
        <Circle color="yellow">
          <VStack style={{ marginTop: '8crem', justifyContent: 'center' }}>
            <Title>
              Get <Em>started</Em> now
            </Title>
            <Text style={{ textAlign: 'center' }}>Schedule a chat with our team</Text>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <VStack>{RequestDemoButton}</VStack>
            </div>
          </VStack>
        </Circle>
      </Section>
    </div>
  );
}
