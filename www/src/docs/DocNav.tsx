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
import { Breakpoint, useBreakpoint, useWindowSize } from '../hooks/useWindowSize';
import { useEffect, useState } from 'react';
import { List } from 'phosphor-react';

const StyledNavListOl = styled('ol', {
  listStyle: 'none',
  boxSizing: 'borderBox',
  padding: '0px 24px 0px 12px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',

  variants: {
    breakpoint: {
      small: {},
      medium: {},
      large: { paddingRight: '56px' },
      xlarge: { paddingRight: '56px' },
    },
  },

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

function NavListItem(props: { path: string[]; id: string; onClick: () => void }) {
  const [location] = useLocation();
  const href = getDocHref(props.path, props.id);
  return (
    <Link href={href} onClick={props.onClick}>
      <StyledNavListItem active={href === location}>{props.id}</StyledNavListItem>
    </Link>
  );
}

function NavList(props: {
  node: RootDocNode;
  path: string[];
  breakpoint?: Breakpoint;
  onClick: () => void;
}) {
  if (typeof props.node === 'function') {
    return null;
  }

  return (
    <StyledNavListOl breakpoint={props.breakpoint}>
      {Object.entries(props.node).map(([key, value], index) => {
        return (
          <StyledNavListLi key={`${key}-${index}`}>
            {'component' in value ? (
              <NavListItem onClick={props.onClick} path={props.path} id={key} />
            ) : null}
            {'title' in value ? <StyledNavListTitle>{value.title}</StyledNavListTitle> : null}
            {'children' in value ? (
              <NavList onClick={props.onClick} node={value.children} path={[...props.path, key]} />
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
  alignItems: 'flex-end',

  variants: {
    breakpoint: {
      small: {},
      medium: {},
      large: {},
      xlarge: {},
    },
  },
});

const LogoRoot = styled('div', {
  flex: 1,
  cursor: 'pointer',
  variants: {
    breakpoint: {
      small: {},
      medium: {},
      large: {},
      xlarge: {},
    },
  },
});

const BurgerMenu = styled('button', {
  border: 'none',
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '4px',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.04)',
    cursor: 'pointer',
  },

  variants: {
    active: {
      true: {
        background: 'rgba(255, 255, 255, 0.08)',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});

function shouldShowNav(breakpoint: Breakpoint) {
  return ['large', 'xlarge'].includes(breakpoint);
}

const NavHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '80px',
  alignItems: 'center',
  padding: '0px 24px',
});

export function Nav(props: { className?: string }) {
  const breakpoint = useBreakpoint();

  const [isOpen, setIsOpen] = useState(() => shouldShowNav(breakpoint));

  const hasMenu = !shouldShowNav(breakpoint);

  useEffect(() => {
    setIsOpen(shouldShowNav(breakpoint));
  }, [breakpoint]);

  return (
    <>
      <div>
        <NavHeader>
          <LogoRoot breakpoint={breakpoint}>
            <Link to="/docs">
              <img src={Logo} />
            </Link>
          </LogoRoot>
          {hasMenu ? (
            <BurgerMenu active={isOpen} onClick={() => hasMenu && setIsOpen(!isOpen)}>
              <List size={24} color="rgba(255,255,255,0.75)" />
            </BurgerMenu>
          ) : null}
        </NavHeader>
        {isOpen ? (
          <div className={props.className}>
            <ScrollAreaRoot style={{ width: '100%' }}>
              <ScrollAreaViewport>
                <NavWrap breakpoint={breakpoint}>
                  <NavList
                    onClick={() => setIsOpen(false)}
                    node={DOCS}
                    path={[]}
                    breakpoint={breakpoint}
                  />
                </NavWrap>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="vertical">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollAreaRoot>
          </div>
        ) : null}
      </div>
    </>
  );
}
