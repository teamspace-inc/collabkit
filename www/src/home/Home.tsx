import { ReactNode, useEffect, useRef, useState } from 'react';
import ChevronDown from '../assets/ChevronDown.svg';
import ycLogoSvg from '../assets/yc-logo.svg';
import checkmarkSvg from '../assets/checkmark.svg';
import { DiscordLogo } from 'phosphor-react';
import { StickyHeader } from '../StickyHeader';
import { Link, Section, Button, Grid, Text, VStack, HStack, styled, Title } from '../UIKit';
import { Logo } from '../Logo';

import HeroExampleSvg from '../assets/HeroExample.svg';
import WorksWithSvg from '../assets/WorksWith.svg';
import HardWorkSvg from '../assets/HardWork.svg';
import SnippetReactSvg from '../assets/SnippetReact.svg';
import SnippetReactSmallSvg from '../assets/ReactSnippetSmall.svg';
// import SnippetVueSvg from '../assets/SnippetVue.svg';
// import SnippetAngularSvg from '../assets/SnippetAngular.svg';
import ReactLogoSvg from '../assets/react.svg';
import VueLogoSvg from '../assets/vue.svg';
import AngularLogoSvg from '../assets/angular.svg';
import FeaturesSmallSvg from '../assets/FeaturesSmall.svg';
import FeaturesSvg from '../assets/Features.svg';
import CustomisePng from '../assets/Customise.png';
import { useWindowSize } from '../hooks/useWindowSize';

export function RequestDemoButton(props: { style?: React.CSSProperties }) {
  return (
    <Button
      style={{ ...props.style }}
      onClick={() =>
        (window.location.href = 'https://calendly.com/namit-chadha/30min?month=2022-07')
      }
    >
      Request demo
    </Button>
  );
}

const FooterLinkButton = styled('a', {
  border: '1px solid white',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '100%',
  boxSizing: 'border-box',
  height: '60px',
  padding: '0 2rem',
  width: '16rem',
  textAlign: 'center',
  borderRadius: '100px',
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',

  '@bp1': { width: '90vw' },
  '@bp2': { width: 'unset' },
});

const StyledSectionHeader = styled(VStack, {
  '@bp1': { gap: '30px', alignItems: 'flex-start' },
  '@bp2': { gap: '60px', alignItems: 'center' },
});

function SectionHeader(props: {
  image?: ReactNode;
  title: string | React.ReactNode | undefined | null;
  description: string | React.ReactNode | undefined | null;
}) {
  return (
    <StyledSectionHeader>
      {props.image}
      <Title>{props.title}</Title>
      <Text>{props.description}</Text>
    </StyledSectionHeader>
  );
}

const PlanGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  columnGap: '0px',
  padding: '0 4rem',

  '@bp1': { gridTemplateColumns: '1fr', rowGap: '2rem', width: 'calc(100% - 4rem)' },
  '@bp2': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    width: 'calc(100% - 100px)',
    maxWidth: '1352px',
  },
});

const Plan = styled(VStack, {
  borderRight: '2px solid #222222',
  '&:last-child': { borderRight: 'transparent' },
  // borderRadius: 24,
  textAlign: 'initial',
  '@bp1': { padding: '40px', borderRightColor: 'transparent' },
  '@bp2': { padding: '0px 30px', borderRightColor: '#222222' },
});

const PlanTitle = styled('h3', {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  marginTop: 0,
  marginBottom: '1.25rem',
  lineHeight: '128.125%',
  letterSpacing: '-0.05em',
  color: '#222222',
});

const PlanPrice = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '36px',
  lineHeight: '120%',
  letterSpacing: '-0.03em',
  color: '#222222',
  marginBottom: '40px',
});

const Small = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '16px',
  opacity: 0.5,
  whiteSpace: 'nowrap',
  letterSpacing: '0',
});

const PlanFeatures = styled('ul', {
  paddingBlock: 0,
  paddingInline: 0,
  marginBottom: '40px',
  listStyleType: 'none',
  flex: 1,
});

const PlanFeatureItem = styled('li', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '20px',
  marginBottom: '20px',
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

const FooterLink = styled('a', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '120%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
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
      <img src={checkmarkSvg} style={{ width: '1rem', height: '20px', marginTop: '0' }} />
      <PlanFeatureContent>{children}</PlanFeatureContent>
    </PlanFeatureItem>
  );
}

export function Home() {
  const [invertFilter, setInvertFilter] = useState(0);
  const examplesRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const isSmallScreen = (windowSize?.width ?? 1000) < 600;
  const footerLinksDivider = isSmallScreen ? null : <span>|</span>;

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
      <Section
        style={{
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
          }}
        >
          <SectionHeader
            title={
              <div style={{ marginTop: '40px' }}>
                {isSmallScreen ? (
                  <span>Commenting made easy</span>
                ) : (
                  <span>
                    Commenting
                    <br /> made easy
                  </span>
                )}{' '}
              </div>
            }
            description={
              isSmallScreen ? (
                <span>
                  Add real-time collaboration to your product with our customisable React SDK.
                </span>
              ) : (
                <span>
                  Add real-time collaboration to your product
                  <br /> with our customisable React SDK.
                </span>
              )
            }
          />
          {!isSmallScreen && (
            <div
              style={{
                height: 60,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() =>
                document
                  .querySelector('#demo')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            >
              <img
                role={'button'}
                src={ChevronDown}
                style={{
                  display: 'block',
                  marginTop: '0px',
                  width: '24px',
                  marginLeft: -12,
                  padding: '60px 0',
                }}
              />
            </div>
          )}
          <img
            id="demo"
            src={HeroExampleSvg}
            style={{ marginTop: '30px', width: 'calc(100vw - 40px)', maxWidth: '1124px' }}
          />
        </Grid>
      </Section>
      <Section
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          background: '#BCF0E1',
        }}
      >
        <SectionHeader
          image={<img style={{ width: isSmallScreen ? '160px' : '210px' }} src={WorksWithSvg} />}
          title={
            isSmallScreen ? (
              <span>Works with everything</span>
            ) : (
              <span>
                Works with
                <br /> everything
              </span>
            )
          }
          description={
            isSmallScreen ? (
              <span>
                From spreadsheets to dashboards; let your users work together as a team in any kind
                of interface.
              </span>
            ) : (
              <span>
                From spreadsheets to dashboards; let your users
                <br /> work together as a team in any kind of interface.
              </span>
            )
          }
        />
      </Section>
      <Section
        ref={examplesRef}
        style={{
          background: '#35284A',
          color: 'white',
        }}
      >
        <SectionHeader
          title={
            <span style={{ color: 'white' }}>
              {isSmallScreen ? (
                <span>Just a few lines of code</span>
              ) : (
                <span>
                  Just a few lines
                  <br /> of code
                </span>
              )}
            </span>
          }
          description={
            <span>
              Simply add <span style={{ color: '' }}>{`<CollabKit.Thread />`}</span>
            </span>
          }
        />
        <VStack
          style={{
            gap: isSmallScreen ? '32px' : '50px',
            alignItems: isSmallScreen ? 'flex-start' : 'center',
          }}
        >
          <img
            style={{ width: '90vw', maxWidth: '812px' }}
            src={isSmallScreen ? SnippetReactSmallSvg : SnippetReactSvg}
          />
          <HStack style={{ gap: '24px' }}>
            <img style={{ width: isSmallScreen ? '33px' : '44px' }} src={ReactLogoSvg} />
            <img style={{ width: isSmallScreen ? '33px' : '44px' }} src={VueLogoSvg} />
            <img style={{ width: isSmallScreen ? '33px' : '44px' }} src={AngularLogoSvg} />
          </HStack>
        </VStack>
      </Section>
      <Section
        style={{
          background: 'white',
        }}
      >
        <SectionHeader
          image={<img style={{ width: isSmallScreen ? '160px' : '210px' }} src={HardWorkSvg} />}
          title={
            <span>
              {isSmallScreen ? (
                <span>We've done the hard work</span>
              ) : (
                <span>
                  We've done
                  <br />
                  the hard work
                </span>
              )}
            </span>
          }
          description={<span>All the features you expect and more.</span>}
        />
        <img
          style={{ width: '90vw', maxWidth: '898px' }}
          src={isSmallScreen ? FeaturesSmallSvg : FeaturesSvg}
        />
      </Section>
      <Section
        style={{
          background: '#F5F3EB',
        }}
      >
        <SectionHeader
          title={
            <span>
              {isSmallScreen ? (
                <span>Customise to fit your brand</span>
              ) : (
                <span>
                  Customise to fit
                  <br />
                  your brand
                </span>
              )}
            </span>
          }
          description={<span>Tailor CollabKit to seamlessly integrate with your UI.</span>}
        />
        <img style={{ maxWidth: '812px' }} src={CustomisePng} />
      </Section>
      <Section
        style={{
          background: '#FFEC6B',
          textAlign: 'center',
        }}
      >
        <SectionHeader
          title={<span>Pricing</span>}
          description={<span>Packages that grow with your business.</span>}
        />
        <PlanGrid>
          <Plan>
            <PlanTitle>Starter</PlanTitle>
            <PlanPrice>
              $10 <br />
              <Small>Per month</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>All the essentials</PlanFeature>
              <PlanFeature>
                100 <br />
                <Small>monthly active users</Small>
              </PlanFeature>
            </PlanFeatures>
            <RequestDemoButton />
          </Plan>
          <Plan>
            <PlanTitle>Startup</PlanTitle>
            <PlanPrice>
              $400 <br />
              <Small>Per month</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>All the essentials</PlanFeature>
              <PlanFeature>
                1,500 <br />
                <Small>monthly active users</Small>
              </PlanFeature>
              <PlanFeature>Customize UI</PlanFeature>
            </PlanFeatures>
            <PlanPricingSmall>$0.10 per additonal user.</PlanPricingSmall>
            <RequestDemoButton />
          </Plan>
          <Plan>
            <PlanTitle>Pro</PlanTitle>
            <PlanPrice>
              $800 <br />
              <Small>Per month</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>All the essentials</PlanFeature>
              <PlanFeature>
                5,000 <br />
                <Small>monthly active users</Small>
              </PlanFeature>
              <PlanFeature>Customize UI</PlanFeature>
              <PlanFeature>Shared Slack Channel</PlanFeature>
            </PlanFeatures>
            <PlanPricingSmall>$0.10 per additonal user.</PlanPricingSmall>

            <RequestDemoButton />
          </Plan>
          <Plan>
            <PlanTitle>Scale</PlanTitle>
            <PlanPrice>
              Custom
              <br />
              <br />
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>All the essentials</PlanFeature>
              <PlanFeature>
                Unlimited <br />
                <Small>monthly active users</Small>
              </PlanFeature>
              <PlanFeature>Customize UI</PlanFeature>
              <PlanFeature>Shared Slack Channel</PlanFeature>
              <PlanFeature>API</PlanFeature>
              <PlanFeature>SLA</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton />
          </Plan>
        </PlanGrid>
      </Section>
      <Section
        style={{
          background: '#222222',
          paddingBottom: '60px',
        }}
      >
        <SectionHeader
          title={<span style={{ color: 'white' }}>Contact Us</span>}
          description={
            <span style={{ color: 'white' }}>Any questions? Email us or join our Discord.</span>
          }
        />
        <HStack
          style={{
            gap: '30px',
            margin: 0,
            ...(isSmallScreen
              ? {
                  flexDirection: 'column',
                }
              : {}),
          }}
        >
          <FooterLinkButton href="mailto:info@collabkit.dev">info@collabkit.dev</FooterLinkButton>
          <FooterLinkButton href="https://discord.gg/UCA4CbZad4">
            <DiscordLogo color="white" weight={'fill'} size={25} />
            Discord
          </FooterLinkButton>
        </HStack>
        <HStack
          style={{
            marginTop: '80px',
            marginBottom: '0rem',
            alignItems: 'center',
            gap: '0.625rem',
          }}
        >
          <img src={ycLogoSvg} style={{ width: '2rem', height: '2rem' }} />
          <Small style={{ color: 'white' }}>Backed by Y Combinator</Small>
        </HStack>
        <HStack
          className="FooterLinks"
          style={{
            alignItems: 'center',
            color: '#999999',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '120%',
            /* or 19px */

            textAlign: 'center',
            letterSpacing: '-0.03em',
            gap: '24px',
            ...(isSmallScreen
              ? {
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '32px',
                }
              : {}),
          }}
        >
          <FooterLink>Teamspace Inc. 2022</FooterLink>
          {footerLinksDivider}
          <FooterLink target="_blank" href="https://www.iubenda.com/privacy-policy/17041190">
            Privacy
          </FooterLink>
          {footerLinksDivider}
          <FooterLink
            target="_blank"
            href="https://www.iubenda.com/privacy-policy/17041190/cookie-policy"
          >
            Cookies
          </FooterLink>
          {footerLinksDivider}
          <FooterLink target="_blank" href="https://www.iubenda.com/terms-and-conditions/17041190">
            Terms &amp; Conditions
          </FooterLink>
        </HStack>
      </Section>
    </VStack>
  );
}
