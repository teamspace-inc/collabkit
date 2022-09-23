import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { DocNode, getDocHref, useDocs } from './Documentation';

const StyledNavListOl = styled('ol', {
  listStyle: 'none',
  boxSizing: 'borderBox',
  paddingLeft: '12px',
  paddingRight: '20px',

  ol: {
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
        background: 'blue',
        color: 'white',
      },
      false: {
        '&:hover': {
          background: 'red',
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

function NavList(props: { node: DocNode; path: string[] }) {
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

export function Nav() {
  const { docs } = useDocs();

  return (
    <div
      style={{
        width: '264px',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid black',
      }}
    >
      <div style={{ padding: 20, borderBottom: '1px solid black' }}>
        <img
          style={{ position: 'relative', top: 2 }}
          src={'http://localhost:8000/src/assets/Logo.svg'}
        />
      </div>
      <ScrollAreaRoot>
        <ScrollAreaViewport>
          <NavList node={docs} path={['docs']} />
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </div>
  );
}
