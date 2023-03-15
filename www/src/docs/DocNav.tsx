import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '../UIKit';
import { getDocHref, RootDocNode } from './DocRoutes';
import * as styles from '../styles/docs/Docs.css';
import { DOCS } from './Docs';

function NavListItem(props: { title?: string; path: string[]; id: string }) {
  const [location] = useLocation();
  const href = getDocHref(props.path, props.id);
  return (
    <Link href={href}>
      <div className={styles.navListItem({ active: href === location })}>
        {props.title || props.id}
      </div>
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
          {'component' in value ? (
            <NavListItem title={value.title} path={props.path} id={key} />
          ) : (
            'title' in value && <div className={styles.navListTitle}>{value.title}</div>
          )}
          {'children' in value ? (
            <NavList node={value.children} path={[...props.path, key]} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function Nav(props: { className?: string }) {
  return (
    <>
      <div>
        <div className={props.className}>
          <ScrollAreaRoot style={{ width: '100%' }}>
            <ScrollAreaViewport>
              <div className={styles.navWrap}>
                <NavList node={DOCS} path={[]} />
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
