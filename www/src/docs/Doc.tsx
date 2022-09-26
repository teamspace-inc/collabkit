import { CaretRight } from 'phosphor-react';
import { Link } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { Nav } from './Nav';

const DocRoot = styled('div', {
  wordWrap: 'break-word',
});

const DocNav = styled(Nav, {
  position: 'fixed',
  inset: 0,
  right: 'unset',
  width: 264,
  background: '#fafafa',
});

const DocContent = styled('div', {
  wordWrap: 'break-word',
  flex: 1,
  boxSizing: 'border-box',
  height: '100vh',
  width: 'auto',

  position: 'fixed',
  left: '264px',
  top: 0,
  bottom: 0,

  blockquote: {
    borderLeft: '2px solid black',
    textIndent: 0,
    paddingLeft: 20,
    marginLeft: 0,
  },

  h1: {
    marginTop: 0,
  },
});

export function DocCalloutLink(props: { href: string; children: React.ReactNode }) {
  return (
    <StyledDocCalloutLink href={props.href}>
      <span style={{ flex: 1, display: 'flex' }}>{props.children}</span>
      <CaretRight size={24} />
    </StyledDocCalloutLink>
  );
}

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
  backgroundColor: '#4158D0',
  backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  display: 'flex',
  padding: 20,
  margin: '0 -20px',
  justifyContent: 'center',
  alignItems: 'center',
});

const DocTitle = styled('h1', {
  display: 'block',
  margin: '48px 0px 0px',
  padding: '20px 0px 10px',
  boxSizing: 'border-box',
  lineHeight: '24px',
});

const DocScrollableContent = styled('div', {
  padding: 20,
});

export function Doc(props: {
  title: string;
  children: React.ReactNode;
  demo?: React.ReactNode;
  next: string[] | undefined;
  prev: string[] | undefined;
}) {
  // const size = useWindowSize();
  return (
    <DocRoot>
      <DocNav />
      <DocContent>
        <div
          style={{
            borderBottom: '1px solid black',
            background: 'white',
            boxSizing: 'border-box',
            margin: 0,
          }}
        ></div>
        <ScrollAreaRoot>
          <ScrollAreaViewport>
            <DocScrollableContent>
              <DocTitle>{props.title}</DocTitle>
              {props.children}
              {props.next ? (
                <DocCalloutLink
                  href={`${props.next
                    ?.map((part) => part.replace(' ', ''))
                    .join('>')
                    .toLowerCase()}`}
                >
                  {props.next.join(' ')}
                </DocCalloutLink>
              ) : null}
            </DocScrollableContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaRoot>
      </DocContent>
    </DocRoot>
  );
}
