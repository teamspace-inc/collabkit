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
      Request a demo
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
      <img src={checkmarkSvg} style={{ width: '1rem', height: '1rem', marginTop: '0.75rem' }} />
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
                From spreadsheets to dashboards; work together as a team in any kind of interface.
              </span>
            ) : (
              <span>
                From spreadsheets to dashboards; work together
                <br /> as a team in any kind of interface.
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
              Just add <span style={{ color: '' }}>{`<CollabKit.Thread />`}</span>
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
          description={<span>Just add the features that are right for you.</span>}
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
          description={<span>Choose a package that suits you.</span>}
        />
        <PlanGrid>
          <Plan>
            <PlanTitle>Starter</PlanTitle>
            <PlanPrice>Free</PlanPrice>
            <PlanFeatures>
              <PlanFeature>100 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton style={{ height: '60px' }} />
          </Plan>
          <Plan>
            <PlanTitle>Pro</PlanTitle>
            <PlanPrice>
              $550 <Small>Per month*</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>Up to 2,500 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customize UI</PlanFeature>
              <PlanFeature>Shared Slack Channel</PlanFeature>
            </PlanFeatures>
            <PlanPricingSmall>
              *Up to 5000 monthly active users, then $0.08 per monthly active user thereafter.
            </PlanPricingSmall>
            <RequestDemoButton style={{ height: '60px' }} />
          </Plan>
          <Plan>
            <PlanTitle>Scale</PlanTitle>
            <PlanPrice>Custom</PlanPrice>
            <PlanFeatures>
              <PlanFeature>Unlimited monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customize UI</PlanFeature>
              <PlanFeature>Shared Slack Channel</PlanFeature>
              <PlanFeature>SLA</PlanFeature>
              <PlanFeature>API</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton style={{ height: '60px' }} />
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
