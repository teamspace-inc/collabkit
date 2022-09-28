import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { getDocHref, RootDocNode, useDocs } from './Docs';

const StyledNavListOl = styled('ol', {
  listStyle: 'none',
  boxSizing: 'borderBox',
  paddingLeft: '12px',
  paddingRight: '20px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',

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
  fontSize: '14px',
  padding: '8px 12px',
  userSelect: 'none',

  color: 'black',
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
            <NavListItem path={props.path} id={key} />
            {value.children ? <NavList node={value.children} path={[...props.path, key]} /> : null}
          </StyledNavListLi>
        );
      })}
    </StyledNavListOl>
  );
}

export function Nav(props: { className?: string }) {
  const { docs } = useDocs();

  return (
    <div className={props.className}>
      <ScrollAreaRoot>
        <ScrollAreaViewport>
          <NavList node={docs} path={[]} />
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </div>
  );
}
