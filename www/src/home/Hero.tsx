import ChevronDown from '../assets/ChevronDown.svg';
import HeroExampleSvg from '../assets/HeroExample.svg';
import { useIsSmallScreen } from './useIsSmallScreen';
import * as styles from '../styles/Hero.css';
import { vars } from '../styles/Theme.css';
// import { ThemeProvider, ThemeWrapper, Thread } from '@collabkit/react';

function Chevron() {
  return (
    <div
      className={styles.chevronWrap}
      onClick={() =>
        document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    >
      <img role={'button'} src={ChevronDown} className={styles.chevron} />
    </div>
  );
}

export function Hero() {
  const isSmallScreen = useIsSmallScreen();
  const title = isSmallScreen ? (
    <>Commenting made easy</>
  ) : (
    <>
      Commenting
      <br /> made easy
    </>
  );
  const description = isSmallScreen ? (
    <>Add real-time collaboration to your product with our customisable React SDK.</>
  ) : (
    <>
      Add real-time collaboration to your product
      <br /> with our customisable React SDK.
    </>
  );

  return (
    <section style={{ background: vars.color.yellow, paddingTop: 240 }}>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <div className={styles.center}>
        {!isSmallScreen ? <Chevron /> : null}
        <div style={{ position: 'relative' }}>
          <img id="demo" src={HeroExampleSvg} className={styles.heroImage} />
          {/* <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 200 }}>
            <ThemeProvider theme="dark">
              <Thread threadId="thread3" />
            </ThemeProvider>
          </div> */}
        </div>
      </div>
    </section>
  );
}
