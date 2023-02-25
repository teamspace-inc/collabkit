import ycLogoSvg from '../assets/yc-logo.svg';

import TwitterLogo from 'phosphor-react/dist/icons/TwitterLogo.esm.js';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

import * as styles from '../styles/home/Contact.css';
import { dark, vars } from '../styles/Theme.css';

export function Contact() {
  const isSmallScreen = useIsSmallScreen();
  const footerLinksDivider = <span>|</span>;

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
        Any questions? Let us know over email or Twitter
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
        <a className={styles.footerLinkButton} href="mailto:namit@collabkit.dev">
          namit@collabkit.dev
        </a>
        <a className={styles.footerLinkButton} href="https://twitter.com/collabkitdev">
          <TwitterLogo color="white" weight={'fill'} size={25} />
          Twitter
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
        <span className={styles.backedByYCText}>Backed by Y Combinator</span>
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
          textAlign: 'center',
          letterSpacing: '-0.03em',
          gap: '24px',
          ...(isSmallScreen
            ? {
                display: 'inline',
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
