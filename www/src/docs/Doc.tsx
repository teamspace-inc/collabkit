import { ThemeProvider } from '@collabkit/react';
import { PropsWithChildren, useEffect } from 'react';
import { Link, LinkProps, LocationHook } from 'wouter';
import * as styles from '../styles/docs/Docs.css';
import { dark, vars } from '../styles/Theme.css';
import { Nav } from './DocNav';
import ArrowLeft from 'phosphor-react/dist/icons/ArrowLeft.esm.js';
import ArrowRight from 'phosphor-react/dist/icons/ArrowRight.esm.js';
import { IconContext } from 'phosphor-react/dist/lib/index.esm.js';
import { store, Header } from '../home/Header';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { SmallHeader } from '../home/small/SmallHeader';
import { proxy, useSnapshot } from 'valtio';

function pathToHref(path?: string[]) {
  return `/docs/${path
    ?.map((part) => part.replace(' ', ''))
    .join('/')
    .toLowerCase()}`;
}

import React, { useCallback, useRef } from 'react';
import { H3 } from './mdx/H3';
import { Code } from './mdx/Code';

export function DocWithSubNav(props: {
  key: string;
  next?: string[];
  prev?: string[];
  component?: React.FunctionComponent;
}) {
  const store = useRef(
    proxy<{
      anchors: { [id: string]: string };
    }>({
      anchors: {},
    })
  );

  const { key, next, prev, component } = props;
  const handleAnchor = useCallback(
    (id: string, link: string) => {
      console.log('anchors', id, link);
      store.current.anchors = { ...store.current.anchors, [id]: link };
    },
    [store]
  );

  const docContent = component?.({
    components: {
      h3: (props: any) => <H3 {...props} onAnchor={handleAnchor} />,
      code: (props: any) => {
        return <Code {...props} />;
      },
    },
  });

  return (
    <Doc key={key} next={next} prev={prev} store={store.current}>
      {docContent}
    </Doc>
  );
}

export function DocFooterLink(props: {
  path?: string[];
  style?: React.CSSProperties;
  direction: 'next' | 'prev';
}) {
  return props.path ? (
    <div className={styles.docFooterLink} style={props.style}>
      <IconContext.Provider value={{ size: 20, weight: 'bold' }}>
        <DocLink href={pathToHref(props.path)}>
          <span
            style={{
              color: vars.color.mint,
              fontWeight: '600',
              fontSize: 16,
              lineHeight: '28px',
              display: 'flex',
              gap: '1ch',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            {props.direction === 'prev' ? <ArrowLeft /> : null}
            <span style={{ flex: 1 }}>{props.path?.[props.path?.length - 1]}</span>
            {props.direction === 'next' ? <ArrowRight /> : null}
          </span>
        </DocLink>
      </IconContext.Provider>
    </div>
  ) : null;
}

export function DocFooter(props: { next?: string[]; prev?: string[] }) {
  return (
    <div className={styles.docFooter}>
      <DocFooterLink path={props.prev} style={{ alignItems: 'flex-start' }} direction="prev" />
      <DocFooterLink path={props.next} style={{ alignItems: 'flex-end' }} direction="next" />
    </div>
  );
}

export const DocLink = (props: PropsWithChildren<LinkProps<LocationHook>>) => (
  <Link {...props} className={styles.docLink} />
);

// mint feels too strong here...
/* background: vars.color.mint, borderColor: vars.color.mint */
export const DocHeroDemoContainer = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <ThemeProvider theme="dark">
    <div {...props} className={styles.docDemoContainer} style={{ ...props.style }} />
  </ThemeProvider>
);

export const DocDemoContainer = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <ThemeProvider theme="dark">
    <div {...props} className={styles.docDemoContainer} />
  </ThemeProvider>
);

export const DocTitle = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <h1 {...props} className={styles.docTitle} />
);

export function Doc(props: {
  children: React.ReactNode;
  next?: string[];
  prev?: string[];
  store: { anchors?: { [id: string]: string } };
}) {
  useEffect(() => {
    store.backgroundColor = vars.color.bgContrastFloor;
    store.theme = 'dark';
    window.scrollTo(0, 0);
  }, []);

  const { anchors } = useSnapshot(props.store);

  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={`${dark}`} style={{ background: vars.color.bgContrastFloor, height: '100vh' }}>
      <div className={`${styles.docRoot}`}>
        <div className={styles.docContent}>
          {isSmallScreen ? null : <Nav className={styles.docNav} />}
          <div className={styles.docScrollableContentWrap}>
            {isSmallScreen ? (
              <SmallHeader>
                <Nav className={styles.docNav} />
              </SmallHeader>
            ) : (
              <Header />
            )}
            <div style={{ display: 'flex', justifyContent: 'center' }} className={styles.docs}>
              <div>
                {JSON.stringify(anchors)}
                <div className={styles.docScrollableContent}>
                  <div className={styles.docBody}>{props.children}</div>
                  <DocFooter next={props.next} prev={props.prev} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
