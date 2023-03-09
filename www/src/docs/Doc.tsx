import { Scrollable, ThemeProvider } from '@collabkit/react';
import { PropsWithChildren, useEffect, useState } from 'react';
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
import { FloatingPortal } from '@floating-ui/react';

function pathToHref(path?: string[]) {
  return `/docs/${path
    ?.map((part) => part.replace(' ', ''))
    .join('/')
    .toLowerCase()}`;
}

import React from 'react';
import { anchorStore, H3 } from './mdx/H3';
import { Code } from './mdx/Code';
import { ApplyTheme, ThemeEditor } from './ThemeEditor';
import {
  themeEditorModal,
  themeEditorModalCloseButton,
  themeEditorModalContent,
  themeEditorModalHeader,
  themeEditorModalHeaderLeft,
  themeEditorModalPreview,
} from '../styles/ThemeEditor.css';
import X from 'phosphor-react/dist/icons/X.esm.js';

function AnchorList() {
  const snap = useSnapshot(anchorStore);
  return (
    <div className={styles.anchors}>
      <div style={{ position: 'fixed' }}>
        <div className={styles.anchorList}>
          <h5>On this page</h5>
          {Object.keys(snap.anchors).map((key) => (
            <a href={'#' + key} className={styles.anchorListItem} key={key}>
              {snap.anchors[key].text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocWithAnchorList(props: {
  next?: string[];
  prev?: string[];
  component?: React.FunctionComponent;
}) {
  const { next, prev, component } = props;

  const docContent = component?.({
    components: {
      h3: (props: any) => <H3 {...props} />,
      code: (props: any) => {
        return <Code {...props} />;
      },
    },
  });

  return (
    <Doc next={next} prev={prev}>
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

export const DocLink = (props: PropsWithChildren<LinkProps<LocationHook>>) => (
  <Link {...props} className={styles.docLink} />
);

export function Demo({
  children,
  hideThemeEditorButton = false,
  ...props
}: {
  children: React.ReactNode;
  hideThemeEditorButton?: boolean;
} & React.ComponentPropsWithoutRef<'div'>) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      document.body.setAttribute('style', 'height: 100vh; overflow: hidden;');
      return () => {
        document.body.setAttribute('style', 'overflow: auto;');
      };
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <FloatingPortal>
        <div className={themeEditorModal} onClick={() => setIsEditing(false)}>
          <div onClick={(e) => e.stopPropagation()} className={themeEditorModalContent}>
            <div className={themeEditorModalHeaderLeft}>
              <p style={{ paddingLeft: 16, color: 'rgba(0,0,0,0.66)' }}>Theme Editor</p>
            </div>
            <div className={themeEditorModalHeader}>
              <button className={themeEditorModalCloseButton} onClick={() => setIsEditing(false)}>
                <X />
              </button>
            </div>
            <div className={themeEditorModalPreview}>
              <ApplyTheme>{children}</ApplyTheme>
            </div>
            <ThemeEditor style={{ height: '100%' }} />
          </div>
        </div>
      </FloatingPortal>
    );
  }

  return (
    <ThemeProvider theme="dark">
      <div {...props} className={styles.docDemoContainer}>
        {children}
        {hideThemeEditorButton ? null : (
          <button onClick={() => setIsEditing(true)} className={styles.themeEditorButton}>
            Theme Editor
          </button>
        )}
      </div>
    </ThemeProvider>
  );
}

export function Doc(props: { children: React.ReactNode; next?: string[]; prev?: string[] }) {
  useEffect(() => {
    store.backgroundColor = vars.color.bgContrastFloor;
    store.theme = 'dark';
    window.scrollTo(0, 0);
    anchorStore.anchors = {};
  }, []);

  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={`${dark}`}>
      {/* <ThemeEditor /> */}
      {isSmallScreen ? (
        <SmallHeader>
          <Nav className={styles.docNav} />
        </SmallHeader>
      ) : (
        <Header />
      )}
      <div className={`${styles.docs} ${styles.docRoot}`}>
        <div className={styles.docContent}>
          {isSmallScreen ? null : <Nav className={styles.docNav} />}
          <div className={styles.docScrollableContentWrap}>
            <div className={styles.docs} style={{ display: 'flex', justifyContent: 'center' }}>
              <div>
                <div className={styles.docScrollableContent}>
                  <div className={styles.docBody}>{props.children}</div>
                  <div className={styles.docFooter}>
                    <DocFooterLink
                      path={props.prev}
                      style={{ alignItems: 'flex-start' }}
                      direction="prev"
                    />
                    <DocFooterLink
                      path={props.next}
                      style={{ alignItems: 'flex-end' }}
                      direction="next"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AnchorList />
        </div>
      </div>
    </div>
  );
}
