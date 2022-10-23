import { Link } from '../UIKit';
import { Logo } from '../Logo';
import { GetStartedButton } from './GetStartedButton';
import { a } from '../styles/UIKit.css';
import { header, headerInner } from '../styles/Website.css';

export function StickyHeader(props: {
  invertFilter?: number;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={header}
      style={{ filter: `invert(${props.invertFilter ?? 0})`, ...props.style }}
    >
      <div className={headerInner}>
        <div>{props.left}</div>
        <div style={{ display: 'flex', flex: 1 }}></div>
        <div style={{ display: 'flex' }}>{props.right}</div>
      </div>
    </div>
  );
}

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
