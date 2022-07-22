import { styled, HStack, VStack } from './UIKit';
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
});

const BackgroundCenter = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
});

const Section = styled('section', {
  padding: '10vh',
  minHeight: '80vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Header = styled('header', {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'stretch',
  flex: 1,
  width: '80vw',
  padding: '0 10vw',
  position: 'fixed',
  zIndex: 2,
});

const Circle = styled('div', {
  width: '44vw',
  height: '44vw',
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
  display: 'flex',
  gap: '180px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  marginBottom: '80px',
});

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
    <div>
      <Header>
        <div style={{ display: 'flex', flex: 1 }}>
          <h1>CollabKit</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
          <Text>Contact us</Text>
          <div style={{ position: 'relative', top: '0.5rem' }}>
            <Button>Request a demo</Button>
          </div>
        </div>
      </Header>
      <Section>
        <VStack>
          <Title>
            Add commenting <br />
            to <Em>your</Em> product
          </Title>
          <Text style={{ textAlign: 'center' }}>
            It only takes minutes, with our
            <br /> customisable React SDK.
          </Text>
        </VStack>
        <img src={ChevronDown} />
        <BackgroundCenter>
          <Circle
            color="sky"
            style={{ position: 'absolute', left: 0, transform: 'translateX(-66%)' }}
          />
          <Circle color="yellow" />
          <Circle
            color="purple"
            style={{ position: 'absolute', right: 0, transform: 'translateX(66%)' }}
          />
        </BackgroundCenter>
      </Section>
      <Section style={{ background: '#9FEFD7' }}>
        <HStack style={{ gap: '4rem' }}>
          <img src={Example} />
          <VStack style={{ width: 320 }}>
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
        </HStack>
      </Section>
      <Section>
        <Title>
          Have <br />
          conversations
          <br /> with <Em>context</Em>
        </Title>
        <Text style={{ textAlign: 'center' }}>
          CollabKit works just like commenting in
          <br /> Figma, Google Docs and Notion.
        </Text>
        <BackgroundCenter>
          <Circle
            color="pink"
            style={{ position: 'absolute', left: 0, transform: 'translateX(-66%)' }}
          />
          <Circle color="amber" />
          <Circle
            color="indigo"
            style={{ position: 'absolute', right: 0, transform: 'translateX(66%)' }}
          />
        </BackgroundCenter>
      </Section>
      <Section>
        <Article>
          <VStack style={{ maxWidth: '380px' }}>
            <Subtitle>Comment on anything</Subtitle>
            <Text>
              Have discussions in context. Conversations about that sale, product, invoice or
              customer all happen in the same place.
            </Text>
          </VStack>
          <div style={{ width: 440 }}>
            <img src={CommentAnything} />
          </div>
        </Article>
        <Article>
          <VStack style={{ maxWidth: '380px' }}>
            <Subtitle>In any type of app</Subtitle>
            <Text>
              CollabKit Works across all kinds of interfaces; CRMs, documents, analytics dashboards,
              calendars and more...
            </Text>
          </VStack>
          <div style={{ width: 440, position: 'relative', left: -44 }}>
            <img src={AnyApp} />
          </div>
        </Article>
        <Article>
          <VStack style={{ maxWidth: '380px' }}>
            <Subtitle>All in real time</Subtitle>
            <Text>
              See who’s online, who’s typing and keep the conversation going without ever leaving
              your product.
            </Text>
          </VStack>
          <div style={{ width: 440 }}>
            <img src={Realtime} />
          </div>
        </Article>
        <Article>
          <VStack style={{ maxWidth: '380px' }}>
            <Subtitle>Get notified by email</Subtitle>
            <Text>
              New comments are sent straight to your inbox. Reply directly via email or click
              through to the comment thread.
            </Text>
          </VStack>
          <div style={{ width: 440 }}>
            <img src={Email} />
          </div>
        </Article>
      </Section>
      <Section style={{ background: '#343643', color: 'white' }}>
        <VStack style={{ textAlign: 'center' }}>
          <Title style={{ color: 'white' }}>
            Why <Em>build</Em> it?
          </Title>
          <Text>CollabKit React SDK integrates in minutes.</Text>
          <br />
          <br />
          <br />
          <br />
        </VStack>
        <HStack style={{ gap: '4rem' }}>
          <VStack style={{ maxWidth: '380px' }}>
            <Subtitle>Let us do the hard work</Subtitle>

            <Text>
              Install our customisable React SDK and add real time collaboration to your product in
              no time.
            </Text>
          </VStack>
          <div
            style={{
              // padding: '1rem',
              // fontSize: '1.5rem',
              // lineHeight: '1.5rem',
              // background: 'rgba(0,0,0,0.1)',
              width: 440,
              // transform: 'scale(1.5)',
              // position: 'relative',
              // left: 200,
              // top: 80,
            }}
          >
            <ExampleCode />
          </div>
        </HStack>
      </Section>
      <Section style={{ background: '#905EC9' }}>
        <Title>
          Get <Em>started</Em> now
        </Title>
        <Text style={{ textAlign: 'center' }}>Schedule a chat with our team</Text>
        <Button>Request a demo</Button>
        <BackgroundCenter>
          <Circle color="yellow" />
        </BackgroundCenter>
      </Section>
    </div>
  );
}
