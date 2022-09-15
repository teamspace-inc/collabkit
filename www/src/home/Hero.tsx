import ChevronDown from '../assets/ChevronDown.svg';
import { Section, Grid } from '../UIKit';
import HeroExampleSvg from '../assets/HeroExample.svg';
import { useIsSmallScreen } from './useIsSmallScreen';
import { SectionHeader } from './Home';

export function Hero() {
  const isSmallScreen = useIsSmallScreen();

  return (
    <Section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#FFEC6B',
      }}
    >
      <Grid
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gridTemplateColumns: '1fr',
        }}
      >
        <SectionHeader
          title={
            <div style={{ marginTop: '40px' }}>
              {isSmallScreen ? (
                <span>Commenting made easy</span>
              ) : (
                <span>
                  Commenting
                  <br /> made easy
                </span>
              )}{' '}
            </div>
          }
          description={
            isSmallScreen ? (
              <span>
                Add real-time collaboration to your product with our customisable React SDK.
              </span>
            ) : (
              <span>
                Add real-time collaboration to your product
                <br /> with our customisable React SDK.
              </span>
            )
          }
        />
        {!isSmallScreen && (
          <div
            style={{
              height: 60,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() =>
              document
                .querySelector('#demo')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          >
            <img
              role={'button'}
              src={ChevronDown}
              style={{
                display: 'block',
                marginTop: '0px',
                width: '24px',
                marginLeft: -12,
                padding: '60px 0',
              }}
            />
          </div>
        )}
        <img
          id="demo"
          src={HeroExampleSvg}
          style={{ marginTop: '30px', width: 'calc(100vw - 40px)', maxWidth: '1124px' }}
        />
      </Grid>
    </Section>
  );
}
