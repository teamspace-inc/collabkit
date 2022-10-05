import ycLogoSvg from '../assets/yc-logo.svg';
import { DiscordLogo } from 'phosphor-react';
import { Section } from '../UIKit';
import { useIsSmallScreen } from './useIsSmallScreen';
import { SectionHeader, Small } from './Home';

import * as styles from '../styles/ContactUs.css';

export function ContactUs() {
  const isSmallScreen = useIsSmallScreen();
  const footerLinksDivider = isSmallScreen ? null : <span>|</span>;

  return (
    <Section
      style={{
        background: '#222222',
        paddingBottom: '60px',
      }}
    >
      <SectionHeader
        title={<span style={{ color: 'white' }}>Contact Us</span>}
        description={
          <span style={{ color: 'white' }}>Any questions? Email us or join our Discord.</span>
        }
      />
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
        <Small style={{ color: 'white' }}>Backed by Y Combinator</Small>
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
        {/* <FooterLink>Teamspace Inc. 2022</FooterLink>
        {footerLinksDivider}
        <FooterLink target="_blank" href="https://www.iubenda.com/privacy-policy/17041190">
          Privacy
        </FooterLink>
        {footerLinksDivider}
        <FooterLink
          target="_blank"
          href="https://www.iubenda.com/privacy-policy/17041190/cookie-policy"
        >
          Cookies
        </FooterLink>
        {footerLinksDivider}
        <FooterLink target="_blank" href="https://www.iubenda.com/terms-and-conditions/17041190">
          Terms &amp; Conditions
        </FooterLink> */}
      </div>
    </Section>
  );
}
