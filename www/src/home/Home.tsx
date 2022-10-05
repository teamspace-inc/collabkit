import { ReactNode } from 'react';
import { Button, Text, styled, Title } from '../UIKit';

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
