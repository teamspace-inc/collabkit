import { Link } from '../UIKit';
import { Logo } from '../Logo';
import { GetStartedButton } from './GetStartedButton';
import { a, website } from '../styles/Website.css';
import { content, rightLinks, root } from '../styles/Header.css';
import { proxy, useSnapshot } from 'valtio';
import { dark, light, vars } from '../styles/Theme.css';
import { useLocation } from 'wouter';
import { useCallback } from 'react';

export const store = proxy<{
  backgroundColor: string;
  theme: 'light' | 'dark';
}>({
  backgroundColor: `${vars.color.yellow}`,
  theme: 'light',
});

export function StickyHeader(props: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`${root} ${website}`} style={props.style}>
      <div className={content}>
        <div>{props.left}</div>
        <div style={{ display: 'flex', flex: 1 }}></div>
        <div style={{ display: 'flex' }}>{props.right}</div>
      </div>
    </div>
  );
}

export function useScrollToLink(props: { selector: string }) {
  const [, setLocation] = useLocation();
  return useCallback(
    (opts?: { behaviour?: 'smooth' | 'auto' }) => {
      const element = document.querySelector(props.selector);
      if (element) {
        element.scrollIntoView({ behavior: opts?.behaviour ?? 'smooth', block: 'start' });
        setLocation(props.selector);
      }
    },
    [props.selector]
  );
}

function ScrollToLink(props: { selector: string; children: React.ReactNode; href: string }) {
  const scrollToLink = useScrollToLink(props);
  const [, setLocation] = useLocation();
  return window.innerWidth > 640 ? (
    <Link
      className={a}
      onClick={() => {
        if (window.location.href.toString().includes('/docs')) {
          setLocation('/');
          setTimeout(() => {
            scrollToLink({ behaviour: 'auto' });
          }, 1);
          scrollToLink();
        } else {
          scrollToLink();
        }
      }}
    >
      {props.children}
    </Link>
  ) : null;
}

function HeaderRightLinks() {
  const [, setLocation] = useLocation();

  return (
    <div className={rightLinks}>
      <ScrollToLink href="/#Pricing" selector="#Pricing">
        Pricing
      </ScrollToLink>
      <ScrollToLink href="/#Contact" selector="#Contact">
        Contact
      </ScrollToLink>
      <Link className={a} onClick={() => setLocation('/docs/introduction')}>
        Docs
      </Link>
      <div style={{ position: 'relative' }}>
        <GetStartedButton />
      </div>
    </div>
  );
}

export function Header() {
  const { backgroundColor, theme } = useSnapshot(store);
  const [location, setLocation] = useLocation();

  return (
    <StickyHeader
      style={{ backgroundColor }}
      left={
        <Logo
          theme={theme}
          onClick={() => {
            if (window.location.href.toString().includes('/docs')) {
              setLocation('/');
            } else {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }
          }}
        />
      }
      right={
        <div className={theme === 'dark' ? dark : light}>
          <HeaderRightLinks />
        </div>
      }
    />
  );
}
