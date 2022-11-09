import { useState } from 'react';
import ChartSvg from '../assets/home/demos/Charts.svg';
import TextSvg from '../assets/home/demos/Text.svg';
import { dark, vars } from '../styles/Theme.css';
import { purpleBg, tab, tabs } from '../styles/Website.css';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { ListDemo } from './ListDemo';
import { DataGridDemo } from '../components/DataGridDemo';
import * as styles from '../styles/home/Demos.css';
import { usePreloadImages } from '../hooks/usePreloadImages';

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

export function Demos() {
  usePreloadImages({ imageUrls: [ChartSvg, TextSvg] });
  const [activeScenario, setActiveScenario] = useState<ScenarioName>('Lists');
  const { ref } = useHeaderStyle({
    backgroundColor: vars.color.aubergine,
    theme: 'dark',
  });
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
