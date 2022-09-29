import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { DOCS, getDocHref, RootDocNode, useDocs } from './Docs';

const StyledNavListOl = styled('ol', {
  listStyle: 'none',
  boxSizing: 'borderBox',
  paddingLeft: '12px',
  paddingRight: '56px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  ol: {
    marginTop: 4,
    marginBottom: 12,
    paddingLeft: 0,
    textIndent: '24px',
    paddingRight: 0,
  },
});

const StyledNavListLi = styled('li', {});

const StyledNavListItem = styled('div', {
  fontSize: '16px',
  boxSizing: 'border-box',
  padding: '8px 12px',
  userSelect: 'none',
  width: '266px',

  color: '#BBBBBB',
  textDecoration: 'none',
  borderRadius: '8px',

  variants: {
    active: {
      true: {
        background: 'black',
        color: 'white',
      },
      false: {
        '&:hover': {
          background: '#888',
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
  fontSize: 14,
  marginTop: '0px',
  paddingLeft: '12px',
  lineHeight: '32px',
  color: '#FFFFFF',
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

function NavList(props: { node: RootDocNode; path: string[] }) {
  if (typeof props.node === 'function') {
    return null;
  }

  return (
    <StyledNavListOl>
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

export function Nav(props: { className?: string }) {
  return (
    <div className={props.className}>
      <ScrollAreaRoot style={{ width: '100%' }}>
        <ScrollAreaViewport>
          <NavList node={DOCS} path={[]} />
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </div>
  );
}
