import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '../UIKit';
import { getDocHref, RootDocNode, useDocs } from './Docs';
import { navLi, navListItem, navListTitle, navOl, navWrap } from '../styles/docs/DocNav.css';

function NavListItem(props: { path: string[]; id: string }) {
  const [location] = useLocation();
  const href = getDocHref(props.path, props.id);
  return (
    <Link href={href}>
      <div className={navListItem({ active: href === location })}>{props.id}</div>
    </Link>
  );
}

function NavList(props: { node: RootDocNode; path: string[] }) {
  if (typeof props.node === 'function') {
    return null;
  }

  return (
    <ol className={navOl}>
      {Object.entries(props.node).map(([key, value], index) => (
        <li className={navLi} key={`${key}-${index}`}>
          {'isEmpty' in value ? <br /> : null}
          {'component' in value ? <NavListItem path={props.path} id={key} /> : null}
          {'title' in value ? <div className={navListTitle}>{value.title}</div> : null}
          {'children' in value ? (
            <NavList node={value.children} path={[...props.path, key]} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function Nav(props: { className?: string }) {
  const docs = useDocs();

  return (
    <>
      <div>
        <div className={props.className}>
          <ScrollAreaRoot style={{ width: '100%' }}>
            <ScrollAreaViewport>
              <div className={navWrap}>
                <NavList node={docs} path={[]} />
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      </div>
    </>
  );
}
