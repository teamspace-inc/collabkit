import { Link } from 'wouter';
import { useBreakpoint } from '../hooks/useWindowSize';
import {
  docContent,
  docDemoContainer,
  docFooter,
  docFooterLink,
  docNav,
  docs,
  docScrollableContent,
  docTitle,
} from '../styles/Docs.css';
import { dark, vars } from '../styles/Theme.css';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { Nav } from './DocNav';

function pathToHref(path?: string[]) {
  return `/docs/${path
    ?.map((part) => part.replace(' ', ''))
    .join('/')
    .toLowerCase()}`;
}

function DocFooterLink(props: {
  path?: string[];
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return props.path ? (
    <div
      className={docFooterLink}
      style={{
        ...props.style,
      }}
    >
      {props.children}
      <DocLink href={pathToHref(props.path)}>
        <span
          style={{
            color: vars.color.yellow,
            fontWeight: '700',
            // textDecorationLine: 'underline',
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
    <div className={docFooter}>
      <DocFooterLink path={props.prev} style={{ alignItems: 'flex-start' }}>
        Prev
      </DocFooterLink>
      <DocFooterLink path={props.next} style={{ alignItems: 'flex-end' }}>
        Next
      </DocFooterLink>
    </div>
  );
}

const StyledDocRoot = styled('div', {
  color: '#BBBBBB',
  background: '#222',
  position: 'fixed',
  inset: 0,
  alignItems: 'flex-start',
  display: 'grid',

  h1: {
    color: 'white',
  },
  h3: {
    color: 'white',
  },

  variants: {
    breakpoint: {
      small: {
        gridTemplateRows: '1fr',
      },
      medium: { gridTemplateRows: '1fr' },
      large: { gridTemplateColumns: 'minmax(400px, 1fr) minmax(780px, 3fr)' },
      xlarge: { gridTemplateColumns: 'minmax(400px, 1fr) minmax(780px, 3fr)' },
    },
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

export const DocDemoContainer = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={docDemoContainer} />
);

export const DocTitle = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <h1 {...props} className={docTitle} />
);

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
  const breakpoint = useBreakpoint();
  const showBorder = ['large', 'xlarge'].includes(breakpoint);
  return (
    <StyledDocRoot breakpoint={breakpoint} className={`${docs} ${dark}`}>
      <Nav className={docNav} />
      <div style={{ height: '100vh', borderLeft: showBorder ? '1px solid #3D3D3D' : 'none' }}>
        <ScrollAreaRoot style={{ width: '100%' }}>
          <ScrollAreaViewport>
            <div className={docScrollableContent}>
              <h1 className={docTitle}>{props.title}</h1>
              <div className={docContent}>{props.children}</div>
              <DocFooter next={props.next} prev={props.prev} />
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaRoot>
      </div>
    </StyledDocRoot>
  );
}
