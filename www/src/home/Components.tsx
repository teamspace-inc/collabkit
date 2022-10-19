import { useState } from 'react';
import PagesSvg from '../assets/Pages.svg';
// import TableSvg from '../assets/Table.svg';
import ChartSvg from '../assets/Chart.svg';
import TextSvg from '../assets/Text.svg';
import { dark } from '../styles/Theme.css';
import { tab, tabs } from '../styles/Website.css';
import { useInvertFilter } from '../hooks/useInvertFilter';
import { DataGridDemo } from '../components/DataGridDemo';
import * as styles from '../styles/home/Demos.css';

const scenarios = ['Pages', 'Tables', 'Charts', 'Text'] as const;
type ScenarioName = typeof scenarios[number];

function Scenario({ scenario }: { scenario: ScenarioName }) {
  const imgStyle = { width: '100%' };
  switch (scenario) {
    case 'Pages':
      return <img src={PagesSvg} style={imgStyle} />;
    case 'Tables':
      return <DataGridDemo />;
    case 'Charts':
      return <img src={ChartSvg} style={imgStyle} />;
    case 'Text':
      return <img src={TextSvg} style={imgStyle} />;
    default:
      return null;
  }
}

export function Components(props: { setInvertFilter: (invert: number) => void }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioName>('Pages');
  const { ref } = useInvertFilter(props);
  return (
    <section ref={ref} className={`${dark} ${styles.section}`} id="HowItWorks">
      <h1>React components</h1>
      <h3 className={styles.h3}>Build your commenting system with ease.</h3>
      <div className={styles.demoOuterWrapper}>
        <div className={tabs}>
          {scenarios.map((scenario) => (
            <div
              key={scenario}
              onClick={() => setActiveScenario(scenario as ScenarioName)}
              className={tab({ active: scenario === activeScenario })}
            >
              {scenario}
            </div>
          ))}
        </div>
        <div className={styles.demoWrapper}>
          <Scenario scenario={activeScenario} />
        </div>
      </div>
    </section>
  );
}
