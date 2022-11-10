import * as heroStyles from '../../styles/home/Hero.css';
import { HeroMessage, HERO_MESSAGES } from '../HeroMessage';
import UISmallPng from '../../assets/graph.png';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';
import { vars } from '../../styles/Theme.css';
import { GetStartedButton } from '../GetStartedButton';

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
        <GetStartedButton size="medium" />
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: 350 }}>
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
