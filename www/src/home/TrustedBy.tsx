import LogoSvgs from '../assets/logos.svg';
import LogoVerticalSvgs from '../assets/logosVerticla.svg';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { vars } from '../styles/Theme.css';

export function TrustedBy() {
  const isSmallScreen = useIsSmallScreen();
  const { ref } = useHeaderStyle({
    backgroundColor: vars.color.textContrastHigh,
    theme: 'dark',
  });

  return (
    <section ref={ref}>
      <div style={{ display: 'flex', gap: isSmallScreen ? 40 : 80, flexDirection: 'column' }}>
        <h1>Trusted by</h1>
        <img src={isSmallScreen ? LogoVerticalSvgs : LogoSvgs} />
      </div>
    </section>
  );
}
