import { CaretRight, IconContext } from 'phosphor-react';
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

const DocNav = styled(Nav, {
  position: 'fixed',
  inset: 0,
  right: 'unset',
  width: 264,
  background: '#fafafa',
});

const DocScrollAreaWrap = styled('div', {
  height: '100vh',
  width: 'calc(100vw - 264px)',
  position: 'fixed',
  left: '264px',
  top: 0,
  bottom: 0,
});

export const DocContent = styled('div', {
  flex: 1,
});

const DocContentFormatting = styled('div', {
  wordWrap: 'break-word',
  flex: 1,
  boxSizing: 'border-box',

  blockquote: {
    borderLeft: '2px solid black',
    textIndent: 0,
    paddingLeft: 20,
    marginLeft: 0,
  },

  code: {
    fontFamily: 'Monaco',
    fontSize: 14,
    color: '#a31515',
  },

  h1: {
    marginTop: 0,
  },
});

const DocTableOfContentsItem = styled('div', {
  padding: 20,
  border: '1px solid black',
  marginBottom: 24,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  alignItems: 'center',
  gap: '12px',

  '&:hover': {
    cursor: 'pointer',
    background: 'rgba(0,0,0,0.1)',
  },
});

export function DocTableOfContents(props: {
  items: { name: string; icon: React.ComponentClass; href: string }[];
}) {
  return (
    <ol style={{ listStyle: 'none', padding: '0' }}>
      <IconContext.Provider value={{ size: 64, weight: 'thin' }}>
        {props.items.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <DocTableOfContentsItem>
                {<item.icon />}
                {item.name}
              </DocTableOfContentsItem>
            </Link>
          </li>
        ))}
      </IconContext.Provider>
    </ol>
  );
}

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
  padding: '100px 20px',
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
    <div>
      <DocNav />
      <DocScrollAreaWrap>
        <ScrollAreaRoot style={{ width: '100%' }}>
          <ScrollAreaViewport style={{ width: '100%' }}>
            <DocScrollableContent>
              <DocContentFormatting>
                <DocTitle>{props.title}</DocTitle>
                <div style={{ flex: 1, width: '' }}>{props.children}</div>
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
      </DocScrollAreaWrap>
    </div>
  );
}
