import { ReactNode, useEffect, useRef, useState } from 'react';
import CommentAnything from '../assets/CommentAnything.svg';
import AnyApp from '../assets/AnyApp.svg';
import Realtime from '../assets/Realtime.svg';
import Email from '../assets/Email.svg';
import ChevronDown from '../assets/ChevronDown.svg';
import RocketLaunchIcon from '../assets/RocketLaunch.svg';
import HandPointingIcon from '../assets/HandPointing.svg';
import Cursor from '../assets/Cursor.svg';
import ycLogoSvg from '../assets/yc-logo.svg';
import checkmarkSvg from '../assets/checkmark.svg';
// import { HomeDemo1 } from './HomeDemo1';
// import { HomeDemo2 } from './HomeDemo2';
// import { HomeDemo3 } from './HomeDemo3';
import { DiscordLogo } from 'phosphor-react';
import { StickyHeader } from '../StickyHeader';
import { Link, Section, Button, Grid, H3, Em, Text, VStack, HStack, styled, Title } from '../UIKit';
import { Logo } from '../Logo';

import HeroExampleSvg from '../assets/HeroExample.svg';
import WorksWithSvg from '../assets/WorksWith.svg';
import HardWorkSvg from '../assets/HardWork.svg';
import SnippetReactSvg from '../assets/SnippetReact.svg';
import SnippetVueSvg from '../assets/SnippetVue.svg';
import SnippetAngularSvg from '../assets/SnippetAngular.svg';
import ReactLogoSvg from '../assets/react.svg';
import VueLogoSvg from '../assets/vue.svg';
import AngularLogoSvg from '../assets/angular.svg';
import FeaturesSvg from '../assets/Features.svg';

const Article = styled('article', {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '20rem 27.5rem',
  columnGap: '8rem',
  border: '2px solid #222222',
  borderRadius: '1.25rem',
  maxWidth: '36rem',

  img: {
    maxWidth: '100%',
  },

  '@bp1': {
    padding: '0rem',
    gridTemplateColumns: '1fr',
  },
  '@bp2': {
    padding: '0rem',
    gridTemplateColumns: '1fr',
  },
});

const FeatureGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr',
  marginTop: '4rem',

  '@bp1': {
    padding: '2rem 2rem 8rem',
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },

  '@bp2': {
    padding: '4rem 4rem 8rem',
    gridTemplateColumns: '1fr 1fr',
    width: 'unset',
    gap: '4rem',
  },
});

export function RequestDemoButton() {
  return (
    <Button
      onClick={() =>
        (window.location.href = 'https://calendly.com/namit-chadha/30min?month=2022-07')
      }
    >
      Request a demo
    </Button>
  );
}

const Hero = (
  <Section
    style={{
      paddingTop: '10rem',
      paddingBottom: '10rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#FFEC6B',
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
      <VStack style={{ margin: '3rem -6rem 0' }}>
        <Title>
          Ship
          <br /> commenting
          <br /> in minutes
        </Title>
        <Text style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
          Add real-time collaboration to your product
          <br /> with our customisable React SDK.
        </Text>
      </VStack>
    </Grid>
    <img
      role={'button'}
      onClick={() =>
        document.querySelector('#boost-activation')?.scrollIntoView({ behavior: 'smooth' })
      }
      src={ChevronDown}
      style={{
        width: '24px',
        marginLeft: -12,
        padding: '60px 0',
      }}
    />
    <img src={HeroExampleSvg} style={{ width: 'calc(100vw - 10rem)', maxWidth: '1124px' }} />
  </Section>
);

// const DemoContainer = styled('div', {
//   maxWidth: '1352px',
//   width: '90vw',
//   maxHeight: '760px',
//   marginTop: '8.75rem',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',

//   '@bp1': {
//     marginTop: '3rem',
//     marginBottom: 0,
//   },
//   '@bp2': {
//     marginTop: '8.75rem',
//   },
// });

const PlanGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr 1fr',
  columnGap: '3rem',
  padding: '0 4rem',

  '@bp1': { gridTemplateColumns: '1fr', rowGap: '2rem', width: 'calc(100% - 4rem)' },
  '@bp2': { gridTemplateColumns: '1fr 1fr 1fr', width: 'calc(100% - 12rem)', maxWidth: '1352px' },
});

const Plan = styled(VStack, {
  border: '2px solid #222222',
  borderRadius: 24,
  textAlign: 'initial',
  '@bp1': { padding: '2.5rem 2rem' },
  '@bp2': { padding: '2.5rem 3.5rem 2.5rem' },
});

const PlanTitle = styled('h3', {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '2rem',
  marginTop: 0,
  marginBottom: '1.25rem',
  lineHeight: '128.125%',
  letterSpacing: '-0.05em',
  color: '#222222',
});

const PlanPrice = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '3rem',
  lineHeight: '120%',
  letterSpacing: '-0.03em',
  color: '#222222',
});

const Small = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '118.75%',
  whiteSpace: 'nowrap',
  letterSpacing: '0',
});

const PlanFeatures = styled('ul', {
  paddingBlock: 0,
  paddingInline: 0,
  marginBottom: '2.5rem',
  listStyleType: 'none',
  flex: 1,
});

const PlanFeatureItem = styled('li', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1rem',
  lineHeight: '250%',
  color: '#222222',
  display: 'flex',
  flexDirection: 'row',
});

const PlanFeatureContent = styled('div', {
  marginLeft: '0.625rem',
});

const PlanPricingSmall = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '15px',
  marginTop: '0rem',
  marginBottom: '1.5rem',
});

const JustAddInnerSection = styled(VStack, {
  textAlign: 'center',
  maxWidth: '58rem',
  width: '90vw',
  justifyContent: 'center',
  alignItems: 'center',

  '@bp1': {
    marginTop: '4rem',
  },
  '@bp2': {
    marginTop: '7rem',
  },
});

const FooterLink = styled('a', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '120%',
  /* or 19px */

  textAlign: 'center',
  letterSpacing: '-0.03em',

  /* Grey 60 */

  color: '#999999',
  textDecoration: 'none',
});

export const DemoImageMobileFallback = styled('img', {
  width: '90vw',
  maxWidth: '90vw',
});

function PlanFeature({ children }: { children: ReactNode }) {
  return (
    <PlanFeatureItem>
      <img src={checkmarkSvg} style={{ width: '1rem', height: '1rem', marginTop: '0.75rem' }} />
      <PlanFeatureContent>{children}</PlanFeatureContent>
    </PlanFeatureItem>
  );
}

export function Home() {
  const [invertFilter, setInvertFilter] = useState(0);
  const examplesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (examplesRef.current) {
        const rect = examplesRef.current.getBoundingClientRect();
        if (rect.top < 0 && rect.top > -rect.height) {
          setInvertFilter(1);
        } else {
          setInvertFilter(0);
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);
  return (
    <VStack style={{ alignItems: 'center' }}>
      <StickyHeader
        style={{ marginTop: '1rem' }}
        invertFilter={invertFilter}
        left={
          <Logo
            onClick={(e) => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          />
        }
        right={
          <HStack style={{ gap: '6rem', alignItems: 'center' }}>
            {window.innerWidth > 640 ? (
              <Link
                style={{ fontWeight: '500', cursor: 'pointer' }}
                onClick={() =>
                  document
                    .getElementsByClassName('FooterLinks')[0]
                    .scrollIntoView({ behavior: 'smooth' })
                }
              >
                Contact us
              </Link>
            ) : null}
            <div style={{ position: 'relative' }}>
              <RequestDemoButton />
            </div>
          </HStack>
        }
      />
      {Hero}
      <Section
        style={{
          paddingTop: '180px',
          paddingBottom: '220px',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#BCF0E1',
        }}
      >
        <VStack
          style={{
            maxWidth: '50rem',
            width: '90vw',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={WorksWithSvg} />
          <Title style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Works with
            <br />
            everything
          </Title>
          <Text>
            From spreadsheets to dashboards; work together
            <br /> as a team in any kind of interface.
          </Text>
        </VStack>
      </Section>
      <Section
        ref={examplesRef}
        style={{
          background: '#35284A',
          color: 'white',
          paddingTop: '220px',
          paddingBottom: '220px',
        }}
      >
        <Title style={{ color: 'white', marginBottom: '3.75rem' }}>
          Just a few lines
          <br />
          of code
        </Title>
        <Text
          style={{
            marginBottom: '4rem',
            marginTop: 0,
            ...(window.innerWidth > 640 ? {} : { padding: '0 2rem', textAlign: 'left' }),
          }}
        >
          Just add <span style={{ color: '' }}>{`<CollabKit.Thread />`}</span>
        </Text>
        <img src={SnippetReactSvg} />
        <HStack style={{ gap: '2.33rem', marginTop: '5rem' }}>
          <img src={ReactLogoSvg} />
          <img src={VueLogoSvg} />
          <img src={AngularLogoSvg} />
        </HStack>
      </Section>
      <Section
        style={{
          background: 'white',
          color: 'white',
          paddingTop: '4rem',
          paddingBottom: '9rem',
        }}
      >
        <img src={HardWorkSvg} />
        <Title style={{ marginBottom: '3.75rem' }}>
          We've done
          <br />
          the hard work
        </Title>
        <Text
          style={{
            color: 'black',
            marginBottom: '100px',
            marginTop: 0,
            ...(window.innerWidth > 640 ? {} : { padding: '0 2rem', textAlign: 'left' }),
          }}
        >
          Just add the features that are right for you.
        </Text>
        <img src={FeaturesSvg} />
      </Section>
      <Section
        style={{
          background: '#FFEC6B',
          textAlign: 'center',
          paddingTop: '10rem',
          paddingBottom: '5rem',
          minHeight: '80vh',
        }}
      >
        <VStack>
          <Title
            style={{
              marginTop: 0,
              marginBottom: '3.75rem',
            }}
          >
            Pricing
          </Title>
          <Text
            style={{
              marginTop: 0,
              marginBottom: '7.5rem',
            }}
          >
            Choose a package that suits you.
          </Text>
        </VStack>
        <PlanGrid>
          <Plan>
            <PlanTitle>Starter</PlanTitle>
            <PlanPrice>Free</PlanPrice>
            <PlanFeatures>
              <PlanFeature>50 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton />
          </Plan>
          {/* <Plan>
            <PlanTitle>Startup</PlanTitle>
            <PlanPrice>
              $300 <Small>Per month*</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>Up to 1,000 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customisability</PlanFeature>
              <PlanFeature>Slack &amp; Discord support</PlanFeature>
            </PlanFeatures>
            <PlanPricingSmall>
              *Up to 5000 monthly active users, then $0.08 per monthly active user thereafter.
            </PlanPricingSmall>
            <RequestDemoButton />
          </Plan> */}
          <Plan>
            <PlanTitle>Pro</PlanTitle>
            <PlanPrice>
              $600 <Small>Per month*</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>Up to 5,000 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customisability</PlanFeature>
              <PlanFeature>Slack &amp; Discord support</PlanFeature>
            </PlanFeatures>
            <PlanPricingSmall>
              *Up to 5000 monthly active users, then $0.08 per monthly active user thereafter.
            </PlanPricingSmall>
            <RequestDemoButton />
          </Plan>
          <Plan>
            <PlanTitle>Scale</PlanTitle>
            <PlanPrice>Custom</PlanPrice>
            <PlanFeatures>
              <PlanFeature>Unlimited monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customisability</PlanFeature>
              <PlanFeature>Slack &amp; Discord support</PlanFeature>
              <PlanFeature>SLA</PlanFeature>
              <PlanFeature>API</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton />
          </Plan>
        </PlanGrid>
      </Section>
      <Section
        style={{
          paddingTop: '15rem',
          paddingBottom: '5rem',
          minHeight: '40vh',
          background: '#222222',
        }}
      >
        <Title style={{ color: 'white', marginBottom: '3.75rem' }}>Contact Us</Title>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '1.25rem',
            textAlign: 'center',
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: '4rem',
          }}
        >
          Any questions? Email us or join our Discord.
        </Text>
        <HStack style={{ gap: '2rem', margin: 0 }}>
          <a
            href="mailto:info@collabkit.dev"
            style={{
              border: '1px solid white',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              boxSizing: 'border-box',
              height: '4rem',
              fontSize: '1.25rem',
              lineHeight: '150%',
              padding: '1rem 2rem',
              width: '16rem',
              textAlign: 'center',
              borderRadius: '100px',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            info@collabkit.dev
          </a>
          <a
            href="https://discord.gg/UCA4CbZad4"
            style={{
              border: '1px solid white',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '1.25rem',
              lineHeight: '100%',
              boxSizing: 'border-box',
              height: '4rem',
              padding: '1rem 2rem',
              width: '16rem',
              textAlign: 'center',
              borderRadius: '100px',
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <DiscordLogo color="white" weight={'fill'} size={20} />
            Discord
          </a>
        </HStack>
        <HStack
          style={{
            marginTop: '10rem',
            marginBottom: '0rem',
            alignItems: 'center',
            gap: '0.625rem',
          }}
        >
          <img src={ycLogoSvg} style={{ width: '2rem', height: '2rem' }} />
          <Small style={{ color: 'white' }}>Backed by Y Combinator</Small>
        </HStack>
        <HStack className="FooterLinks" style={{ gap: '1rem', marginTop: '2rem' }}>
          <FooterLink>Teamspace Inc. 2022</FooterLink>
          <FooterLink target="_blank" href="https://www.iubenda.com/privacy-policy/17041190">
            Privacy
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.iubenda.com/privacy-policy/17041190/cookie-policy"
          >
            Cookies
          </FooterLink>
          <FooterLink target="_blank" href="https://www.iubenda.com/terms-and-conditions/17041190">
            Terms &amp; Conditions
          </FooterLink>
        </HStack>
      </Section>
    </VStack>
  );
}
