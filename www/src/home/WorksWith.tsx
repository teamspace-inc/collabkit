import { Section } from '../UIKit';
import WorksWithSvg from '../assets/WorksWith.svg';
import { useIsSmallScreen } from './useIsSmallScreen';
import { SectionHeader } from './Home';

export function WorksWith() {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Section
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: '#BCF0E1',
      }}
    >
      <SectionHeader
        image={<img style={{ width: isSmallScreen ? '160px' : '210px' }} src={WorksWithSvg} />}
        title={
          isSmallScreen ? (
            <span>Works with everything</span>
          ) : (
            <span>
              Works with
              <br /> everything
            </span>
          )
        }
        description={
          isSmallScreen ? (
            <span>
              From spreadsheets to dashboards; let your users work together as a team in any kind of
              interface.
            </span>
          ) : (
            <span>
              From spreadsheets to dashboards; let your users
              <br /> work together as a team in any kind of interface.
            </span>
          )
        }
      />
    </Section>
  );
}
