import { dark, vars } from '../../styles/Theme.css';
import { button, h3OnPurple, purpleBg, vertical20, vertical40 } from '../../styles/Website.css';
import CodeSvg from '../../assets/home/code/codeSmall.svg';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';

export function SmallCode() {
  const { ref } = useHeaderStyle({ backgroundColor: vars.color.aubergine, theme: 'dark' });

  return (
    <section ref={ref} className={`${purpleBg} ${dark}`}>
      <div className={vertical40}>
        <div className={vertical20}>
          <h1>Get it running in minutes</h1>
          <h3 className={h3OnPurple}>Simply add {'<CollabKit.Thread />'}</h3>
        </div>
        <div
          style={{
            background: 'rgba(0,0,0,0.3)',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={CodeSvg} />
        </div>
        <div className={vertical20} style={{ width: 'calc(100vw - 20px)', paddingLeft: '20px' }}>
          <button className={button({ type: 'secondary', size: 'medium' })}>Find out more</button>
        </div>
      </div>
    </section>
  );
}
