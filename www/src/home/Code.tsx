import SnippetReactSvg from '../assets/SnippetReact.svg';
import SnippetReactSmallSvg from '../assets/ReactSnippetSmall.svg';
import ReactLogoSvg from '../assets/react.svg';
import VueLogoSvg from '../assets/vue.svg';

import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { useInvertFilter } from '../hooks/useInvertFilter';

import { dark } from '../styles/Theme.css';
import { h3 } from '../styles/home/Code.css';

export function Code(props: { setInvertFilter: (invert: number) => void }) {
  const isSmallScreen = useIsSmallScreen();
  const { ref } = useInvertFilter(props);
  return (
    <section
      ref={ref}
      className={dark}
      style={{
        background: '#35284A',
        color: 'white',
      }}
    >
      <h1>Get it running in minutes</h1>
      <h3 className={h3}>Simply add {'<CollabKit.Thread />'}</h3>
      <div
        style={{
          gap: isSmallScreen ? '32px' : '50px',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
        }}
      >
        <img
          style={{ width: '90vw', maxWidth: '1124px' }}
          src={isSmallScreen ? SnippetReactSmallSvg : SnippetReactSvg}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <img style={{ width: isSmallScreen ? '33px' : '44px' }} src={ReactLogoSvg} />
          <img style={{ width: isSmallScreen ? '33px' : '44px' }} src={VueLogoSvg} />
        </div>
      </div>
    </section>
  );
}
