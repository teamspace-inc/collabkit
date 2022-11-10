import { useEffect } from 'react';
import { Header, store } from '../home/Header';
import { SmallHeader } from '../home/small/SmallHeader';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { light, vars } from '../styles/Theme.css';
import { button, website } from '../styles/Website.css';

export function GetStartedPage() {
  const { ref } = useHeaderStyle({ backgroundColor: vars.color.ice, theme: 'light' });

  useEffect(() => {
    store.backgroundColor = vars.color.ice;
  }, []);

  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={`${website} ${light}`}>
      {isSmallScreen ? <SmallHeader /> : <Header />}
      <section ref={ref} style={{ padding: '0px 40px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '40px',
            height: '100vh',
            backgroundColor: vars.color.ice,
            width: '100vw',
          }}
        >
          <h1>Enter your email</h1>
          <h3>
            We'll send you your API keys in
            <br /> a few hours
          </h3>
          <form
            style={{
              display: 'flex',
              gap: '20px',
              padding: '20px',
              width: isSmallScreen ? '100%' : 'unset',
              flexDirection: isSmallScreen ? 'column' : 'row',
            }}
          >
            <input
              type="email"
              placeholder="name@work-email.com"
              style={{
                border: '1px solid #BBBBBB',
                borderRadius: 100,
                height: 50,
                width: isSmallScreen ? 'auto' : 300,
                padding: 16,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '110%',
              }}
            />
            <button className={button({ size: 'large', type: 'primary' })}>Continue</button>
          </form>
        </div>
      </section>
    </div>
  );
}
