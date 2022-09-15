import { Grid, Section, styled, VStack } from '../UIKit';
import { SectionHeader, RequestDemoButton, Small } from './Home';
import checkmarkSvg from '../assets/checkmark.svg';

export const PlanGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr 1fr',
  columnGap: '0px',
  padding: '0 4rem',

  '@bp1': { gridTemplateColumns: '1fr', rowGap: '2rem', width: 'calc(100% - 4rem)' },
  '@bp2': {
    gridTemplateColumns: '1fr 1fr 1fr',
    width: 'calc(100% - 100px)',
    maxWidth: '1352px',
  },
});

export const Plan = styled(VStack, {
  borderRight: '2px solid #222222',
  '&:last-child': { borderRight: 'transparent' },
  // borderRadius: 24,
  textAlign: 'initial',
  '@bp1': { padding: '40px', borderRightColor: 'transparent' },
  '@bp2': { padding: '0px 30px', borderRightColor: '#222222' },
});

export const PlanTitle = styled('h3', {
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

export const PlanPrice = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '36px',
  lineHeight: '120%',
  letterSpacing: '-0.03em',
  color: '#222222',
  marginBottom: '40px',
});

export const PlanFeatures = styled('ul', {
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

export const PlanPricingSmall = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '15px',
  marginTop: '0rem',
  marginBottom: '1.5rem',
});

export function PlanFeature({ children }: { children: React.ReactNode }) {
  return (
    <PlanFeatureItem>
      <img src={checkmarkSvg} style={{ width: '1rem', height: '20px', marginTop: '0' }} />
      <PlanFeatureContent>{children}</PlanFeatureContent>
    </PlanFeatureItem>
  );
}
export function Plans() {
  return (
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
          <PlanTitle>Startup</PlanTitle>
          <PlanPrice>
            $400 <br />
            <Small>Per month</Small>
          </PlanPrice>
          <PlanFeatures>
            <PlanFeature>All the essentials</PlanFeature>
            <PlanFeature>
              1,000 <br />
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
  );
}
