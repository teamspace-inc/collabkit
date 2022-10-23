import ycLogoSvg from '../assets/yc-logo.svg';
import { DiscordLogo } from 'phosphor-react';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

import * as styles from '../styles/home/Contact.css';
import { dark, vars } from '../styles/Theme.css';

export function Contact() {
  const isSmallScreen = useIsSmallScreen();
  const footerLinksDivider = isSmallScreen ? null : <span>|</span>;

  return (
    <section
      id="Contact"
      className={dark}
      style={{
        background: vars.color.bgContrastLowest,
        paddingBottom: '60px',
      }}
    >
      <h1>Contact Us</h1>
      <h3 style={{ color: vars.color.textContrastLow }}>
        Any questions? Let us know over email or Discord
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          margin: 0,
          ...(isSmallScreen
            ? {
                flexDirection: 'column',
              }
            : {}),
        }}
      >
        <a className={styles.footerLinkButton} href="mailto:info@collabkit.dev">
          info@collabkit.dev
        </a>
        <a className={styles.footerLinkButton} href="https://discord.gg/UCA4CbZad4">
          <DiscordLogo color="white" weight={'fill'} size={25} />
          Discord
        </a>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '80px',
          marginBottom: '0rem',
          alignItems: 'center',
          gap: '0.625rem',
        }}
      >
        <img src={ycLogoSvg} style={{ width: '2rem', height: '2rem' }} />
        <small style={{ color: 'white' }}>Backed by Y Combinator</small>
      </div>
      <div
        className="FooterLinks"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: '#999999',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '120%',
          /* or 19px */
          textAlign: 'center',
          letterSpacing: '-0.03em',
          gap: '24px',
          ...(isSmallScreen
            ? {
                alignItems: 'center',
                flexDirection: 'column',
                gap: '32px',
              }
            : {}),
        }}
      >
        <a className={styles.footerLink}>Teamspace Inc. 2022</a>
        {footerLinksDivider}
        <a
          className={styles.footerLink}
          target="_blank"
          href="https://www.iubenda.com/privacy-policy/17041190"
        >
          Privacy
        </a>
        {footerLinksDivider}
        <a
          className={styles.footerLink}
          target="_blank"
          href="https://www.iubenda.com/privacy-policy/17041190/cookie-policy"
        >
          Cookies
        </a>
        {footerLinksDivider}
        <a
          className={styles.footerLink}
          target="_blank"
          href="https://www.iubenda.com/terms-and-conditions/17041190"
        >
          Terms &amp; Conditions
        </a>
      </div>
    </section>
  );
}
