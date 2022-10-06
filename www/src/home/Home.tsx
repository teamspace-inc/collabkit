import { ReactNode } from 'react';
import { styled } from '../UIKit';

const Title = styled('h1', {
  fontFamily: 'Space Grotesk',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '4.66rem',
  lineHeight: '95%',
  textAlign: 'center',
  letterSpacing: '-0.05em',
  color: '#222222',
  margin: '0px',
  zIndex: 1,

  '@bp1': { textAlign: 'left', marginTop: 0, maxWidth: '90vw', minWidth: '90vw', fontSize: '48px' },
  '@bp2': {
    maxWidth: 'unset',
    minWidth: 'unset',
    fontSize: '112px',
    lineHeight: '100px',
    textAlign: 'center',
  },
});

const Button = styled('button', {
  fontFamily: 'Inter',
  padding: '12px 24px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  height: '4rem',
  boxSizing: 'border-box',
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

  '@bp1': { fontSize: '16px', padding: '0px 20px', height: '44px' },
  '@bp2': { fontSize: '19px', lineHeight: '22px', padding: '0px 24px', height: '60px' },
});

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

const StyledSectionHeader = styled('div', {
  '@bp1': { gap: '30px', alignItems: 'flex-start' },
  '@bp2': { gap: '60px', alignItems: 'center' },
});

const Text = styled('p', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '44px',
  textAlign: 'center',
  letterSpacing: '-0.02em',
  fontFeatureSettings: 'ss04 on',
  margin: 0,

  '@bp1': {
    textAlign: 'left',
    marginTop: 0,
    maxWidth: '90vw',
    minWidth: '90vw',
    fontSize: '24px',
    lineHeight: '32px',
  },
  '@bp2': {
    textAlign: 'center',
    maxWidth: 'unset',
    minWidth: 'unset',
    fontSize: '24px',
    lineHeight: '32px',
  },
});

export function SectionHeader(props: {
  image?: ReactNode;
  title: string | React.ReactNode | undefined | null;
  description: string | React.ReactNode | undefined | null;
}) {
  return (
    <StyledSectionHeader style={{ display: 'flex', flexDirection: 'column' }}>
      {props.image}
      <Title>{props.title}</Title>
      <Text>{props.description}</Text>
    </StyledSectionHeader>
  );
}

export const Small = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '16px',
  opacity: 0.5,
  whiteSpace: 'nowrap',
  letterSpacing: '0',
});

export const DemoImageMobileFallback = styled('img', {
  width: '90vw',
  maxWidth: '90vw',
});
