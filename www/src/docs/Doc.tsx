import { ThemeProvider } from '@collabkit/react';
import { PropsWithChildren, useEffect } from 'react';
import { Link, LinkProps, LocationHook } from 'wouter';
import {
  docContent,
  docDemoContainer,
  docFooter,
  docFooterLink,
  docLink,
  docNav,
  docRoot,
  docs,
  docScrollableContent,
  docScrollableContentWrap,
  docTitle,
} from '../styles/Docs.css';
import { dark, vars } from '../styles/Theme.css';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '../UIKit';
import { Nav } from './DocNav';
import { ArrowLeft, ArrowRight, IconContext } from 'phosphor-react';

function pathToHref(path?: string[]) {
  return `/docs/${path
    ?.map((part) => part.replace(' ', ''))
    .join('/')
    .toLowerCase()}`;
}

export function DocFooterLink(props: {
  path?: string[];
  style?: React.CSSProperties;
  direction: 'next' | 'prev';
}) {
  console.log(props.path);
  return props.path ? (
    <div
      className={docFooterLink}
      style={{
        ...props.style,
      }}
    >
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
    <div className={docFooter}>
      <DocFooterLink path={props.prev} style={{ alignItems: 'flex-start' }} direction="prev" />
      <DocFooterLink path={props.next} style={{ alignItems: 'flex-end' }} direction="next" />
    </div>
  );
}

export const DocLink = (props: PropsWithChildren<LinkProps<LocationHook>>) => (
  <Link {...props} className={docLink} />
);

// mint feels too strong here...
/* background: vars.color.mint, borderColor: vars.color.mint */
export const DocHeroDemoContainer = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <ThemeProvider theme="dark">
    <div {...props} className={docDemoContainer} style={{ ...props.style }} />
  </ThemeProvider>
);

export const DocDemoContainer = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <ThemeProvider theme="dark">
    <div {...props} className={docDemoContainer} />
  </ThemeProvider>
);

export const DocTitle = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <h1 {...props} className={docTitle} />
);

export function Doc(props: {
  title: string;
  children: React.ReactNode;
  next: string[] | undefined;
  prev: string[] | undefined;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`${docs} ${dark}`}>
      <div className={docRoot}>
        <Nav className={docNav} />
        <div className={docScrollableContentWrap}>
          <ScrollAreaRoot style={{ width: '100%' }}>
            <ScrollAreaViewport>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                  <div className={docScrollableContent}>
                    <h1 className={docTitle}>{props.title}</h1>
                    <div className={docContent}>{props.children}</div>
                    <DocFooter next={props.next} prev={props.prev} />
                  </div>
                </div>
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      </div>
    </div>
  );
}
