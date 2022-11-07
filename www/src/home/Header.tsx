import { Link } from '../UIKit';
import { Logo } from '../Logo';
import { GetStartedButton } from './GetStartedButton';
import { a, website } from '../styles/Website.css';
import { content, rightLinks, root } from '../styles/Header.css';
import { proxy, useSnapshot } from 'valtio';
import { dark, light, vars } from '../styles/Theme.css';
import { useLocation } from 'wouter';

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

function ScrollToLink(props: { selector: string; children: React.ReactNode; href: string }) {
  const [location, setLocation] = useLocation();
  return window.innerWidth > 640 ? (
    <Link
      className={a}
      onClick={() => {
        const el = document.querySelectorAll(props.selector)[0];
        el ? el.scrollIntoView({ behavior: 'smooth', block: 'start' }) : setLocation(props.href);
      }}
    >
      {props.children}
    </Link>
  ) : null;
}

function HeaderRightLinks() {
  const [location, setLocation] = useLocation();

  return (
    <div className={rightLinks}>
      <ScrollToLink href="/#Pricing" selector="#Pricing">
        Pricing
      </ScrollToLink>
      <ScrollToLink href="/#Contact" selector="#Contact">
        Contact
      </ScrollToLink>
      <Link className={a} onClick={() => setLocation('/docs')}>
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

  return (
    <StickyHeader
      style={{ backgroundColor }}
      left={
        <Logo
          theme={theme}
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
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
