import WorksWithSvg from '../assets/WorksWith.svg';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

export function WorksWith() {
  const isSmallScreen = useIsSmallScreen();
  return (
    <section
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: '#BCF0E1',
      }}
    >
      <img style={{ width: isSmallScreen ? '160px' : '210px' }} src={WorksWithSvg} />
      <h1>Works with {!isSmallScreen && <br />} everything</h1>
      <h3>
        From spreadsheets to dashboards; let your users
        {!isSmallScreen && <br />} work together as a team in any kind of interface.
      </h3>
    </section>
  );
}
