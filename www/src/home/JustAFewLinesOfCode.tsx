import { useEffect, useRef } from 'react';
import { Section } from '../UIKit';
import SnippetReactSvg from '../assets/SnippetReact.svg';
import SnippetReactSmallSvg from '../assets/ReactSnippetSmall.svg';
import ReactLogoSvg from '../assets/react.svg';
import VueLogoSvg from '../assets/vue.svg';
import AngularLogoSvg from '../assets/angular.svg';
import { useIsSmallScreen } from './useIsSmallScreen';
import { SectionHeader } from './Home';

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
    <Section
      ref={examplesRef}
      style={{
        background: '#35284A',
        color: 'white',
      }}
    >
      <SectionHeader
        title={
          <span style={{ color: 'white' }}>
            {isSmallScreen ? (
              <span>Just a few lines of code</span>
            ) : (
              <span>
                Just a few lines
                <br /> of code
              </span>
            )}
          </span>
        }
        description={
          <span>
            Simply add <span style={{ color: '' }}>{`<CollabKit.Thread />`}</span>
          </span>
        }
      />
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
          <img style={{ width: isSmallScreen ? '33px' : '44px' }} src={AngularLogoSvg} />
        </div>
      </div>
    </Section>
  );
}
