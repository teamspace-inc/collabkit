import * as heroStyles from '../../styles/home/Hero.css';
import * as styles from '../../styles/Website.css';
import { HeroMessage, HERO_MESSAGES } from '../HeroMessage';
import UISmallSvg from '../../assets/home/hero/ui-small.svg';
import UISmallPng from '../../assets/graph.png';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';
import { vars } from '../../styles/Theme.css';

export function SmallHero() {
  const { ref } = useHeaderStyle({ backgroundColor: vars.color.yellow, theme: 'light' });

  return (
    <section ref={ref} className={heroStyles.section} style={{ justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
        <h1 className={heroStyles.h1}>
          Commenting
          <br /> made easy
        </h1>
        <h3 className={heroStyles.h3}>
          Add contextual collaboration to
          <br /> your product with our
          <br /> customisable React SDK
        </h3>
        <button className={styles.button({ type: 'primary', size: 'medium' })}>Get Started</button>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 350, marginLeft: -20 }}>
            <img style={{ width: 350 }} src={UISmallPng} />
          </div>
          <HeroMessage message={HERO_MESSAGES[0]} />
          <HeroMessage message={HERO_MESSAGES[1]} />
          <HeroMessage message={HERO_MESSAGES[2]} />
        </div>
      </div>
    </section>
  );
}
