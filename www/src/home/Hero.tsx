import * as styles from '../styles/home/Hero.css';
import { useFloatingNodeId, useFloating, autoUpdate } from '@floating-ui/react-dom-interactions';
import { GetStartedButton } from './GetStartedButton';

import UISvg from '../assets/home/hero/ui.svg';
import { HeroMessage, HERO_MESSAGES } from './HeroMessage';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { vars } from '../styles/Theme.css';
import { store } from './Header';
import { useEffect } from 'react';

export function Hero() {
  const { ref } = useHeaderStyle({
    backgroundColor: vars.color.yellow,
    theme: 'light',
  });

  useEffect(() => {
    store.backgroundColor = vars.color.yellow;
    store.theme = 'light';
  }, []);

  const title = (
    <>
      Commenting
      <br />
      made easy
    </>
  );
  const description = (
    <>
      Add contextual collaboration to your product
      <br /> with our customisable React SDK.
    </>
  );

  const nodeId = useFloatingNodeId();
  const { floating, reference, context } = useFloating({
    nodeId,
    strategy: 'fixed',
    placement: 'right-start',
    open: true,
    whileElementsMounted: autoUpdate,
  });

  return (
    <section ref={ref} className={styles.section}>
      <h1 className={styles.h1}>{title}</h1>
      <h3>{description}</h3>
      <GetStartedButton />
      <div
        ref={floating}
        style={{
          position: context.strategy,
          left: context.x ?? 0,
          top: context.y ?? 0,
          marginTop: -40,
          marginLeft: -280,
        }}
      >
        <div className={styles.messageList}>
          <HeroMessage message={HERO_MESSAGES[0]} />
          <HeroMessage message={HERO_MESSAGES[1]} />
        </div>
      </div>

      <div className={styles.uiWrap} ref={reference}>
        <img src={UISvg} />
      </div>
    </section>
  );
}
