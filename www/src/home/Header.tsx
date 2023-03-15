import { Link } from '../UIKit';
import { LogoImg } from '../Logo';
import { a, website } from '../styles/Website.css';
import { content, rightLinks, root } from '../styles/Header.css';
import { proxy, useSnapshot } from 'valtio';
import { dark, light } from '../styles/Theme.css';
import { useLocation } from 'wouter';
import React, { useCallback } from 'react';
import { CTA } from './CTA';

export const store = proxy<{
  backgroundColor: string;
  theme: 'light' | 'dark';
}>({
  backgroundColor: '#F5F5F5',
  theme: 'light',
});

export function HeaderContent(props: { left?: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className={content}>
      <div>{props.left}</div>
      <div style={{ display: 'flex', flex: 1 }}></div>
      <div style={{ display: 'flex' }}>{props.right}</div>
    </div>
  );
}

export function HeaderRoot(props: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className={`${root} ${website} ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
}

export function useScrollToLink() {
  const [, setLocation] = useLocation();
  return useCallback((props: { selector: string; behaviour?: 'smooth' | 'auto' }) => {
    const element = document.querySelector(props.selector);
    if (element) {
      element.scrollIntoView({ behavior: props?.behaviour ?? 'smooth', block: 'start' });
      setLocation(props.selector);
    }
  }, []);
}

export function isDocsInPath() {
  return window.location.href.toString().includes('/docs');
}

export function ScrollToLink(props: {
  selector: string;
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const scrollToLink = useScrollToLink();
  const [, setLocation] = useLocation();
  return (
    <Link
      className={props.className}
      onClick={() => {
        if (window.location.href.toString().includes('/docs')) {
          setLocation('/');
          setTimeout(() => {
            scrollToLink({ ...props, behaviour: 'auto' });
          }, 1);
          scrollToLink(props);
        } else {
          scrollToLink(props);
        }
      }}
    >
      {props.children}
    </Link>
  );
}

function HeaderRightLinks() {
  const [, setLocation] = useLocation();

  return (
    <div className={rightLinks}>
      <ScrollToLink className={a} href="/#Pricing" selector="#Pricing">
        Pricing
      </ScrollToLink>
      <ScrollToLink className={a} href="/#Contact" selector="#Contact">
        Contact
      </ScrollToLink>
      <Link className={a} onClick={() => setLocation('/docs/getting-started')}>
        Docs
      </Link>
      <CTA />
    </div>
  );
}

export function useLogoClick() {
  const [, setLocation] = useLocation();
  return () => {
    if (isDocsInPath()) {
      setLocation('/');
    } else if (window.location.href.toString().includes('/getstarted')) {
      setLocation('/');
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
}

export function HeaderLogoImg(props: React.ComponentPropsWithoutRef<'img'>) {
  const { theme } = useSnapshot(store);
  const onClick = useLogoClick();
  return <LogoImg theme={theme} onClick={onClick} {...props} />;
}

export function Header() {
  const { theme, backgroundColor } = useSnapshot(store);

  return (
    <HeaderRoot style={{ backgroundColor }}>
      <HeaderContent
        left={<HeaderLogoImg />}
        right={
          <div className={theme === 'dark' ? dark : light}>
            <HeaderRightLinks />
          </div>
        }
      />
    </HeaderRoot>
  );
}
