import { Section } from '../UIKit';
import CustomisePng from '../assets/Customise.png';
import { useIsSmallScreen } from './useIsSmallScreen';
import { SectionHeader } from './Home';

export function Customise() {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Section
      style={{
        background: '#F5F3EB',
      }}
    >
      <SectionHeader
        title={
          <span>
            {isSmallScreen ? (
              <span>Customise to fit your brand</span>
            ) : (
              <span>
                Customise to fit
                <br />
                your brand
              </span>
            )}
          </span>
        }
        description={<span>Tailor CollabKit to seamlessly integrate with your UI.</span>}
      />
      <img style={{ maxWidth: '812px' }} src={CustomisePng} />
    </Section>
  );
}
