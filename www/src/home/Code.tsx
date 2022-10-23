import SnippetReactSvg from '../assets/SnippetReact.svg';
import SnippetReactSmallSvg from '../assets/ReactSnippetSmall.svg';
import ReactLogoSvg from '../assets/react.svg';
import VueLogoSvg from '../assets/vue.svg';

import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { useInvertFilter } from '../hooks/useInvertFilter';

import { dark } from '../styles/Theme.css';
import { h3 } from '../styles/home/Code.css';
import { renderCodeSnippet } from '../docs/CodeEditor';
import { docs } from '../styles/Docs.css';
import { Link } from 'wouter';
import { button } from '../styles/Website.css';

import CodeSvg from '../assets/home/code/code.svg';

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
        paddingTop: '40px',
      }}
    >
      <h1>Get it running in minutes</h1>
      <h3 className={h3}>Simply add {'<CollabKit.Thread />'}</h3>
      <Link to="/docs" className={button({ type: 'secondary', size: 'medium' })}>
        Documentation
      </Link>
      <div
        className={docs}
        style={{ textAlign: 'center', alignItems: 'flex-start', width: '100%' }}
      >
        {/* {renderCodeSnippet(`
        <CollabKit.Provider appId={'APP_ID'} token={'USER_TOKEN'}>
        <CollabKit.Thread threadId={'your-first-thread'} />
      </CollabKit.Provider>`)} */}
        <div
          style={{
            display: 'flex',
            padding: '120px 0 120px',
            background: 'rgba(0, 0, 0, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '-160px',
          }}
        >
          <img src={CodeSvg} />
        </div>
      </div>
      {/* <div
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
      </div> */}
    </section>
  );
}
