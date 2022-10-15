import { StickyHeader } from '../StickyHeader';
import { Link } from '../UIKit';
import { Logo } from '../Logo';
import { GetStartedButton } from './GetStartedButton';
import { a } from '../styles/UIKit.css';

function ScrollToLink(props: { selector: string; children: React.ReactNode }) {
  return window.innerWidth > 640 ? (
    <Link
      className={a}
      onClick={() =>
        document
          .querySelectorAll(props.selector)[0]
          .scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    >
      {props.children}
    </Link>
  ) : null;
}

export function Header(props: { invertFilter: number }) {
  return (
    <StickyHeader
      style={{ marginTop: '40px' }}
      invertFilter={props.invertFilter}
      left={
        <Logo
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
        <div style={{ display: 'flex', flexDirection: 'row', gap: '80px', alignItems: 'center' }}>
          <ScrollToLink selector="#HowItWorks">How it works</ScrollToLink>
          <ScrollToLink selector="#Pricing">Pricing</ScrollToLink>
          <ScrollToLink selector="#Contact">Contact</ScrollToLink>
          <Link className={a} href="/docs">
            Docs
          </Link>
          <div style={{ position: 'relative' }}>
            <GetStartedButton />
          </div>
        </div>
      }
    />
  );
}
