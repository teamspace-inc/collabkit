import {
  HeaderContent,
  HeaderLogoImg,
  HeaderRoot,
  store,
  useLogoClick,
  useScrollToLink,
} from '../Header';
import BurgerSvg from '../../assets/Burger.svg';
import BurgerXSvg from '../../assets/BurgerX.svg';
import BurgerDarkSvg from '../../assets/BurgerDark.svg';
import BurgerXDarkSvg from '../../assets/BurgerXDark.svg';
import React, { useEffect, useState } from 'react';
import { dark, light } from '../../styles/Theme.css';
import { useLocation } from 'wouter';
import { Link } from '../../UIKit';
import { smallLink, smallLinkList, smallLogoImg, smallMenu } from '../../styles/Header.css';
import { useSnapshot } from 'valtio';

export function SmallHeader(props: { children?: React.ReactNode }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [, setLocation] = useLocation();
  const scrollToLink = useScrollToLink();
  const { theme, backgroundColor } = useSnapshot(store);
  const onLogoClick = useLogoClick();

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBurgerOpen]);

  return (
    <HeaderRoot className={theme === 'dark' ? dark : light} style={{ backgroundColor }}>
      {isBurgerOpen ? (
        <div className={smallMenu} style={{ backgroundColor }}>
          <div className={smallLinkList}>
            {props.children ?? (
              <>
                <Link
                  className={smallLink}
                  href="/#Pricing"
                  onClick={() => {
                    setIsBurgerOpen(false);
                    setTimeout(() => {
                      scrollToLink({ selector: '#Pricing' });
                    }, 1);
                  }}
                >
                  Pricing
                </Link>
                <Link
                  className={smallLink}
                  href="/#Contact"
                  onClick={() => {
                    setIsBurgerOpen(false);
                    setTimeout(() => {
                      scrollToLink({ selector: '#Contact' });
                    }, 1);
                  }}
                >
                  Contact
                </Link>
                <Link className={smallLink} onClick={() => setLocation('/docs/introduction')}>
                  Docs
                </Link>
                <Link className={smallLink} onClick={() => setLocation('/getstarted')}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
      <HeaderContent
        left={
          <HeaderLogoImg
            className={smallLogoImg}
            onClick={() => {
              setIsBurgerOpen(false);
              onLogoClick();
            }}
          />
        }
        right={
          isBurgerOpen ? (
            <img
              onClick={() => setIsBurgerOpen(false)}
              src={theme === 'light' ? BurgerXSvg : BurgerXDarkSvg}
            />
          ) : (
            <img
              onClick={() => setIsBurgerOpen(true)}
              src={theme === 'light' ? BurgerSvg : BurgerDarkSvg}
            />
          )
        }
      />
    </HeaderRoot>
  );
}
