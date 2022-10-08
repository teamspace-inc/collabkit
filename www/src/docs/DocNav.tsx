import { Link, useLocation } from 'wouter';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '../UIKit';
import Logo from './Logo.svg';
import { DOCS, getDocHref, RootDocNode } from './Docs';
import { Breakpoint, useBreakpoint } from '../hooks/useWindowSize';
import { useEffect, useState } from 'react';
import { List } from 'phosphor-react';
import {
  navBurgerToggle,
  navHeader,
  navLi,
  navListItem,
  navListTitle,
  navLogoInner,
  navLogoOuter,
  navOl,
  navWrap,
} from '../styles/Docs.css';

function NavListItem(props: { path: string[]; id: string; onClick: () => void }) {
  const [location] = useLocation();
  const href = getDocHref(props.path, props.id);
  return (
    <Link href={href} onClick={props.onClick}>
      <div className={navListItem({ active: href === location })}>{props.id}</div>
    </Link>
  );
}

function NavList(props: {
  node: RootDocNode;
  path: string[];
  breakpoint?: Breakpoint;
  onClick: () => void;
}) {
  if (typeof props.node === 'function') {
    return null;
  }

  return (
    <ol className={navOl}>
      {Object.entries(props.node).map(([key, value], index) => (
        <li className={navLi} key={`${key}-${index}`}>
          {'component' in value ? (
            <NavListItem onClick={props.onClick} path={props.path} id={key} />
          ) : null}
          {'title' in value ? <div className={navListTitle}>{value.title}</div> : null}
          {'children' in value ? (
            <NavList onClick={props.onClick} node={value.children} path={[...props.path, key]} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function shouldShowNav(breakpoint: Breakpoint) {
  return ['large', 'xlarge'].includes(breakpoint);
}

export function Nav(props: { className?: string }) {
  const breakpoint = useBreakpoint();

  const [isOpen, setIsOpen] = useState(() => shouldShowNav(breakpoint));

  const hasMenu = !shouldShowNav(breakpoint);

  useEffect(() => {
    setIsOpen(shouldShowNav(breakpoint));
  }, [breakpoint]);

  return (
    <>
      <div>
        <div className={navHeader}>
          <Link to="/docs">
            <div className={navLogoOuter}>
              <div className={navLogoInner}>
                <img src={Logo} />
              </div>
            </div>
          </Link>

          {hasMenu ? (
            <div
              className={navBurgerToggle({ active: isOpen })}
              onClick={() => hasMenu && setIsOpen(!isOpen)}
            >
              <List size={24} color="rgba(255,255,255,0.75)" />
            </div>
          ) : null}
        </div>
        {isOpen ? (
          <div className={props.className}>
            <ScrollAreaRoot style={{ width: '100%' }}>
              <ScrollAreaViewport>
                <div className={navWrap}>
                  <NavList
                    onClick={() => hasMenu && setIsOpen(false)}
                    node={DOCS}
                    path={[]}
                    breakpoint={breakpoint}
                  />
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="vertical">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollAreaRoot>
          </div>
        ) : null}
      </div>
    </>
  );
}
