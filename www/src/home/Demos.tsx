import { useState } from 'react';
import ChartSvg from '../assets/home/demos/Charts.svg';
import TextSvg from '../assets/home/demos/Text.svg';
import { dark } from '../styles/Theme.css';
import { purpleBg, tab, tabs } from '../styles/Website.css';
import { useInvertFilter } from '../hooks/useInvertFilter';
import { ListDemo } from './ListDemo';
import { DataGridDemo } from '../components/DataGridDemo';
import * as styles from '../styles/home/Demos.css';

const scenarios = ['Lists', 'Tables', 'Charts', 'Text'] as const;
type ScenarioName = typeof scenarios[number];

function Scenario({ scenario }: { scenario: ScenarioName }) {
  const imgStyle = { width: '100%' };
  switch (scenario) {
    case 'Lists':
      return <ListDemo />;
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

export function Demos(props: { setInvertFilter: (invert: number) => void }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioName>('Lists');
  const { ref } = useInvertFilter(props);
  return (
    <section ref={ref} className={`${dark} ${purpleBg}`} id="HowItWorks">
      <h1>Works with any UI</h1>
      <h3 className={styles.h3}>CollabKit supports multiple ways to comment</h3>
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
