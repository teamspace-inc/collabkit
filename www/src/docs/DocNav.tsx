import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import Logo from './Logo.svg';
import { DOCS, getDocHref, RootDocNode } from './Docs';
import { Breakpoint, useWindowSize } from '../hooks/useWindowSize';
import { useEffect, useState } from 'react';

const StyledNavListOl = styled('ol', {
  listStyle: 'none',
  boxSizing: 'borderBox',
  padding: '0px 12px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',

  ol: {
    marginTop: 0,
    marginBottom: 8,
    paddingLeft: 0,
    textIndent: '24px',
    paddingRight: 0,
  },
});

const StyledNavListLi = styled('li', {
  display: 'flex',
  flexDirection: 'column',

  variants: {
    breakpoint: {
      small: { alignItems: 'flex-start' },
      medium: { alignItems: 'flex-start' },
      large: { alignItems: 'flex-end' },
      xlarge: { alignItems: 'flex-end' },
    },
  },
});

const StyledNavListItem = styled('div', {
  fontSize: '16px',
  lineHeight: '32px',
  boxSizing: 'border-box',
  padding: '4px 12px',
  userSelect: 'none',
  flex: 1,

  color: '#BBBBBB',
  textDecoration: 'none',
  borderRadius: '4px',

  variants: {
    active: {
      true: {
        background: 'rgba(255, 255, 255, 0.08)',
        color: 'white',
        fontWeight: 600,
      },
      false: {
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.04)',
          cursor: 'pointer',
          color: 'white',
        },
      },
    },
  },
});

const StyledNavListTitle = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  color: '#fff',
  fontSize: 14,
  marginTop: '8px',
  paddingLeft: '12px',
  lineHeight: '32px',
});

function NavListItem(props: { path: string[]; id: string }) {
  const [location] = useLocation();
  const href = getDocHref(props.path, props.id);
  return (
    <Link href={href}>
      <StyledNavListItem active={href === location}>{props.id}</StyledNavListItem>
    </Link>
  );
}

function NavList(props: { node: RootDocNode; path: string[]; breakpoint?: Breakpoint }) {
  if (typeof props.node === 'function') {
    return null;
  }

  return (
    <StyledNavListOl breakpoint={props.breakpoint}>
      {Object.entries(props.node).map(([key, value], index) => {
        return (
          <StyledNavListLi key={`${key}-${index}`}>
            {'component' in value ? <NavListItem path={props.path} id={key} /> : null}
            {'title' in value ? <StyledNavListTitle>{value.title}</StyledNavListTitle> : null}

            {'children' in value ? (
              <NavList node={value.children} path={[...props.path, key]} />
            ) : null}
          </StyledNavListLi>
        );
      })}
    </StyledNavListOl>
  );
}

const NavWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '100px',

  variants: {
    small: {},
    medium: {},
    large: {},
    xlarge: {},
  },
});

const LogoRoot = styled('div', {
  width: 310,
  padding: '40px 24px 10px',
});

function shouldShowNav(breakpoint?: Breakpoint) {
  return breakpoint && ['large', 'xlarge'].includes(breakpoint);
}

export function Nav(props: { className?: string }) {
  const size = useWindowSize();
  const [isOpen, setIsOpen] = useState(() => shouldShowNav(size?.breakpoint));

  useEffect(() => {
    setIsOpen(shouldShowNav(size?.breakpoint));
  }, [size?.breakpoint]);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Open</button>
      {isOpen ? (
        <div className={props.className}>
          <ScrollAreaRoot style={{ width: '100%' }}>
            <ScrollAreaViewport>
              <NavWrap breakpoint={size?.breakpoint}>
                <LogoRoot>
                  <img src={Logo} />
                </LogoRoot>
                <NavList node={DOCS} path={[]} breakpoint={size?.breakpoint} />
              </NavWrap>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      ) : null}
    </>
  );
}
