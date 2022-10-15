import { useEffect, useRef } from 'react';
import SnippetReactSvg from '../assets/SnippetReact.svg';
import SnippetReactSmallSvg from '../assets/ReactSnippetSmall.svg';
import ReactLogoSvg from '../assets/react.svg';
import VueLogoSvg from '../assets/vue.svg';
import { useIsSmallScreen } from './useIsSmallScreen';
import { dark } from '../styles/Theme.css';

export function JustAFewLinesOfCode(props: { setInvertFilter: (invert: number) => void }) {
  const examplesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (examplesRef.current) {
        const rect = examplesRef.current.getBoundingClientRect();
        if (rect.top < 0 && rect.top > -rect.height) {
          props.setInvertFilter(1);
        } else {
          props.setInvertFilter(0);
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);
  const isSmallScreen = useIsSmallScreen();
  return (
    <section
      ref={examplesRef}
      className={dark}
      style={{
        background: '#35284A',
        color: 'white',
      }}
    >
      <h1>
        Get it running
        {!isSmallScreen && <br />} in minutes
      </h1>
      <h3>Simply add {'<CollabKit.Thread />'}</h3>
      <div
        style={{
          gap: isSmallScreen ? '32px' : '50px',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
        }}
      >
        <img
          style={{ width: '90vw', maxWidth: '812px' }}
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
