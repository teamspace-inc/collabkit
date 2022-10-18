import { useEffect } from 'react';
import { Link } from 'wouter';
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

function pathToHref(path?: string[]) {
  return `/docs/${path
    ?.map((part) => part.replace(' ', ''))
    .join('/')
    .toLowerCase()}`;
}

function DocFooterLink(props: {
  path?: string[];
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return props.path ? (
    <div
      className={docFooterLink}
      style={{
        ...props.style,
      }}
    >
      {props.children}
      <DocLink href={pathToHref(props.path)}>
        <span
          style={{
            color: vars.color.yellow,
            fontWeight: '700',
          }}
        >
          {props.path?.[props.path?.length - 1]}
        </span>
      </DocLink>
    </div>
  ) : null;
}

export function DocFooter(props: { next?: string[]; prev?: string[] }) {
  return (
    <div className={docFooter}>
      <DocFooterLink path={props.prev} style={{ alignItems: 'flex-start' }}>
        Prev
      </DocFooterLink>
      <DocFooterLink path={props.next} style={{ alignItems: 'flex-end' }}>
        Next
      </DocFooterLink>
    </div>
  );
}

export const DocLink = (props: React.ComponentPropsWithoutRef<'div'> & { href?: string }) => (
  <Link {...props} className={docLink} />
);

export const DocDemoContainer = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={docDemoContainer} />
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
