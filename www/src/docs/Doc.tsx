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

function pathToHref(path?: string[]) {
  return path
    ?.map((part) => part.replace(' ', ''))
    .join('/')
    .toLowerCase();
}

function DocFooterLink(props: {
  path?: string[];
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return props.path ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignItems: 'flex-start',
        flex: 1,
        ...props.style,
      }}
    >
      {props.children}
      <DocLink href={pathToHref(props.path)}>
        <span
          style={{
            color: '#FFEC6B',
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
        >
          {props.path?.[props.path?.length - 1]}
        </span>
      </DocLink>
    </div>
  ) : null;
}

export function DocFooter(props: { next?: string[]; prev?: string[] }) {
  return (
    <div
      style={{
        marginTop: 60,
        borderTop: '1px solid #3D3D3D',
        paddingTop: 20,
        paddingBottom: 100,
        color: '#BBBBBB',
        fontFamily: 'Inter',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '28px',
      }}
    >
      <DocFooterLink path={props.prev} style={{ alignItems: 'flex-start' }}>
        Prev
      </DocFooterLink>
      <DocFooterLink path={props.next} style={{ alignItems: 'flex-end' }}>
        Next
      </DocFooterLink>
    </div>
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

export const DocLink = styled(Link, {
  borderRadius: '6px',
  textDecoration: 'none',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '34px',
  textDecorationLine: 'underline',
  color: '#FFEC6B',
  cursor: 'pointer !important',
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
                <DocFooter next={props.next} prev={props.prev} />
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
