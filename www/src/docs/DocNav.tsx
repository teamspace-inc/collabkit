import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '../UIKit';
import { getDocHref, RootDocNode, useDocRoutes } from './DocRoutes';
import * as styles from '../styles/docs/Docs.css';

function NavListItem(props: { path: string[]; id: string }) {
  const [location] = useLocation();
  const href = getDocHref(props.path, props.id);
  return (
    <Link href={href}>
      <div className={styles.navListItem({ active: href === location })}>{props.id}</div>
    </Link>
  );
}

function NavList(props: { node: RootDocNode; path: string[] }) {
  if (typeof props.node === 'function') {
    return null;
  }

  return (
    <ol className={styles.navOl}>
      {Object.entries(props.node).map(([key, value], index) => (
        <li className={styles.navLi} key={`${key}-${index}`}>
          {'isEmpty' in value ? <br /> : null}
          {'component' in value ? <NavListItem path={props.path} id={key} /> : null}
          {'title' in value ? <div className={styles.navListTitle}>{value.title}</div> : null}
          {'children' in value ? (
            <NavList node={value.children} path={[...props.path, key]} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function Nav(props: { className?: string }) {
  const docRoutes = useDocRoutes();

  return (
    <>
      <div>
        <div className={props.className}>
          <ScrollAreaRoot style={{ width: '100%' }}>
            <ScrollAreaViewport>
              <div className={styles.navWrap}>
                <NavList node={docRoutes} path={[]} />
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
