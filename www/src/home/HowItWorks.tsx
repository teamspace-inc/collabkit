import { useState } from 'react';
import PagesSvg from '../assets/Pages.svg';
import TableSvg from '../assets/Table.svg';
import ChartSvg from '../assets/Chart.svg';
import TextSvg from '../assets/Text.svg';
import { dark } from '../styles/Theme.css';
import { tab, tabs } from '../styles/Website.css';
import { useInvertFilter } from '../hooks/useInvertFilter';

const scenarios = ['Pages', 'Tables', 'Charts', 'Text'] as const;
type ScenarioName = typeof scenarios[number];

function Scenario({ scenario }: { scenario: ScenarioName }) {
  const imgStyle = { maxWidth: 'calc(100vw - 200px)' };
  switch (scenario) {
    case 'Pages':
      return <img src={PagesSvg} style={imgStyle} />;
    case 'Tables':
      // return <DataGridDemo />
      return <img src={TableSvg} style={imgStyle} />;
    case 'Charts':
      return <img src={ChartSvg} style={imgStyle} />;
    case 'Text':
      return <img src={TextSvg} style={imgStyle} />;
    default:
      return null;
  }
}

export function HowItWorks(props: { setInvertFilter: (invert: number) => void }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioName>('Pages');
  const { ref } = useInvertFilter(props);
  return (
    <section
      ref={ref}
      className={dark}
      id="HowItWorks"
      style={{
        background: '#35284A',
        color: 'white',
      }}
    >
      <h1>How it works</h1>
      <h3>CollabKit supports multiple interfaces and is fully customisable</h3>
      <div style={{ maxWidth: '1124px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '50px 1fr',
            alignSelf: 'start',
            gap: '40px',
            marginTop: '60px',
          }}
        >
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
          <div
            style={{
              gap: '40px',
            }}
          >
            <Scenario scenario={activeScenario} />
          </div>
        </div>
      </div>
    </section>
  );
}
