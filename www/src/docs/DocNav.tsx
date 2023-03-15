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
import algoliasearch from 'algoliasearch/lite';
import {
  Hits,
  InstantSearch,
  SearchBox,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch-hooks-web';
import { DOCS } from './Docs';

const searchClient = algoliasearch('RALBVTC225', 'd23c222aff0b33683f85f4d49c790be8');

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
  return (
    <InstantSearch searchClient={searchClient} indexName="collabkit-docs">
      <div>
        <div className={props.className}>
          <SearchBox />
          <ScrollAreaRoot style={{ width: '100%' }}>
            <ScrollAreaViewport>
              <div className={styles.navWrap}>
                <SearchResult>
                  <Hits hitComponent={Hit} />
                </SearchResult>
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
    </InstantSearch>
  );
}

function Hit({
  hit,
}: {
  hit: { name: string; image: string; price: string; categories: string[] };
}) {
  return <div>{JSON.stringify(hit)}</div>;
}

export function SearchResult({ children }: { children: React.ReactNode }) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (results.nbHits === 0) {
    if (results.__isArtificial) return null;
    return <div>No results for "${results.query}".</div>;
  }

  return <>{children}</>;
}
