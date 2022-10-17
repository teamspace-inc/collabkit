import CustomisePng from '../assets/Customise.png';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

export function Customise() {
  const isSmallScreen = useIsSmallScreen();
  return (
    <section
      style={{
        background: '#F5F3EB',
      }}
    >
      <h1>
        Customise to fit
        {!isSmallScreen && <br />} your brand
      </h1>
      <h3>Tailor CollabKit to seamlessly integrate with your UI.</h3>
      <img style={{ maxWidth: '812px' }} src={CustomisePng} />
    </section>
  );
}
