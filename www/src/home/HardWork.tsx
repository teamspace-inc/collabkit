import HardWorkSvg from '../assets/HardWork.svg';
import FeaturesSmallSvg from '../assets/FeaturesSmall.svg';
import FeaturesSvg from '../assets/Features.svg';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

export function HardWork() {
  const isSmallScreen = useIsSmallScreen();
  return (
    <section>
      <img style={{ width: isSmallScreen ? '160px' : '210px' }} src={HardWorkSvg} />
      <h1>
        We've done
        {!isSmallScreen && <br />}
        the hard work
      </h1>
      <h3>All the features you expect and more.</h3>
      <img
        style={{ width: '90vw', maxWidth: '898px' }}
        src={isSmallScreen ? FeaturesSmallSvg : FeaturesSvg}
      />
    </section>
  );
}
