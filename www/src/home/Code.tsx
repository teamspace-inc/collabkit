import { useHeaderStyle } from '../hooks/useHeaderStyle';

import { dark } from '../styles/Theme.css';
import { codeWrap, h3, section } from '../styles/home/Code.css';
import { docs } from '../styles/Docs.css';
import { Link } from 'wouter';
import { button, purpleBg } from '../styles/Website.css';

import CodeSvg from '../assets/home/code/code.svg';
import { vars } from '../styles/Theme.css';

export function Code() {
  const { ref } = useHeaderStyle({
    backgroundColor: vars.color.aubergine,
    theme: 'dark',
  });
  return (
    <section ref={ref} className={`${dark} ${section}`}>
      <h1>Get it running in minutes</h1>
      <h3 className={h3}>Simply add {'<CollabKit.Thread />'}</h3>
      <Link to="/docs" className={button({ type: 'secondary', size: 'medium' })}>
        Documentation
      </Link>
      <div
        className={docs}
        style={{ textAlign: 'center', alignItems: 'flex-start', width: '100%' }}
      >
        <div className={codeWrap}>
          <img src={CodeSvg} />
        </div>
      </div>
    </section>
  );
}
