import { Section } from '../UIKit';
import HardWorkSvg from '../assets/HardWork.svg';
import FeaturesSmallSvg from '../assets/FeaturesSmall.svg';
import FeaturesSvg from '../assets/Features.svg';
import { useIsSmallScreen } from './useIsSmallScreen';
import { SectionHeader } from './Home';

export function HardWork() {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Section
      style={{
        background: 'white',
      }}
    >
      <SectionHeader
        image={<img style={{ width: isSmallScreen ? '160px' : '210px' }} src={HardWorkSvg} />}
        title={
          <span>
            {isSmallScreen ? (
              <span>We've done the hard work</span>
            ) : (
              <span>
                We've done
                <br />
                the hard work
              </span>
            )}
          </span>
        }
        description={<span>All the features you expect and more.</span>}
      />
      <img
        style={{ width: '90vw', maxWidth: '898px' }}
        src={isSmallScreen ? FeaturesSmallSvg : FeaturesSvg}
      />
    </Section>
  );
}
