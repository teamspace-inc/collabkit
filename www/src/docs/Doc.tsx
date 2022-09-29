import { CaretRight } from 'phosphor-react';
import { Link } from 'wouter';
import { useWindowSize } from '../hooks/useWindowSize';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { Nav } from './DocNav';

const DocNav = styled(Nav, {
  position: 'sticky',
  height: '100vh',
  top: 0,
  background: '#222',
  borderRight: '1px solid #3D3D3D',
  color: 'white',

  variants: {
    breakpoint: {
      small: {
        position: 'unset',
      },
      medium: { background: '#222' },
      large: { background: 'blue' },
      xlarge: { background: 'green' },
    },
  },
});

const DocContentFormatting = styled('div', {
  wordWrap: 'break-word',
  flex: 1,
  boxSizing: 'border-box',

  lineHeight: '28px',

  blockquote: {
    borderLeft: '2px solid black',
    textIndent: 0,
    paddingLeft: 20,
    marginLeft: 0,
  },

  code: {
    fontFamily: 'Monaco',
    fontSize: 14,
    color: '#FFEC6B',
  },

  h1: {
    marginTop: 0,
  },
});

export function DocCalloutLink(props: {
  style?: React.CSSProperties;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <StyledDocCalloutLink href={props.href} style={props.style}>
      <span style={{ flex: 1, display: 'flex' }}>{props.children}</span>
      <CaretRight size={24} />
    </StyledDocCalloutLink>
  );
}

const DocRoot = styled('div', {
  height: '100vh',
  color: '#BBBBBB',
  background: '#222',
  position: 'fixed',
  inset: 0,
  alignItems: 'flex-start',
  display: 'grid',
  gridTemplateColumns: 'minmax(400px, 1fr) minmax(780px, 3fr)',

  h1: {
    color: 'white',
  },
  h3: {
    color: 'white',
  },
});

export const StyledDocCalloutLink = styled(Link, {
  display: 'flex',
  color: 'black',
  width: '100%',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: '12px 20px',
  border: '1px solid black',
  borderRadius: '6px',
  textDecoration: 'none',
});

export const DocLink = styled(Link, {
  color: 'blue',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export const DocDemoContainer = styled('div', {
  flex: 1,
  backgroundColor: '#92E4FD',
  display: 'flex',
  borderRadius: '8px',
  padding: '100px 20px',
  margin: '0',
  justifyContent: 'center',
  alignItems: 'center',
});

const DocTitle = styled('h1', {
  display: 'block',
  margin: '0px !important',
  padding: '64px 0px 40px',
  boxSizing: 'border-box',
  lineHeight: '24px',
});

const DocScrollableContent = styled('div', {
  padding: 20,
  maxWidth: 760,
  display: 'table',
  margin: '0 auto',
  height: '100vh',
  position: 'sticky',
  top: 0,
  boxSizing: 'border-box',
});

const DocContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  flex: 1,
});

export function Doc(props: {
  title: string;
  children: React.ReactNode;
  next: string[] | undefined;
  prev: string[] | undefined;
}) {
  const size = useWindowSize();
  return (
    <DocRoot>
      <DocNav breakpoint={size?.breakpoint} />
      <div style={{ height: '100vh' }}>
        <ScrollAreaRoot style={{ width: '100%' }}>
          <ScrollAreaViewport>
            <DocScrollableContent>
              <DocContentFormatting>
                <DocTitle>{props.title}</DocTitle>
                <DocContent>{props.children}</DocContent>
                {props.next ? (
                  <DocCalloutLink
                    style={{ marginTop: '20px' }}
                    href={`/${props.next
                      ?.map((part) => part.replace(' ', ''))
                      .join('/')
                      .toLowerCase()}`}
                  >
                    {props.next.join(' ')}
                  </DocCalloutLink>
                ) : null}
              </DocContentFormatting>
            </DocScrollableContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaRoot>
      </div>
    </DocRoot>
  );
}
