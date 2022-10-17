import { useState } from 'react';
import PagesSvg from '../assets/Pages.svg';
import TableSvg from '../assets/Table.svg';
import ChartSvg from '../assets/Chart.svg';
import TextSvg from '../assets/Text.svg';
import { dark } from '../styles/Theme.css';
import { tab, tabs } from '../styles/Website.css';
import { useInvertFilter } from '../hooks/useInvertFilter';

const scenarios = {
  Pages: PagesSvg,
  Tables: TableSvg,
  Charts: ChartSvg,
  Text: TextSvg,
  // Lists: TextSvg,
  // Canvas: TextSvg,
  // Anywhere: TextSvg,
  // Video: TextSvg,
};

type scenarioNames = keyof typeof scenarios;

export function HowItWorks(props: { setInvertFilter: (invert: number) => void }) {
  const [activeScenario, setActiveScenario] = useState<scenarioNames>('Pages');
  const demoMaxWidth = window.innerWidth - 200;
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
      <h3>CollabKit supports multiple interfaces is fully customisable</h3>
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
            {Object.keys(scenarios).map((scenario) => (
              <div
                onClick={() => setActiveScenario(scenario as scenarioNames)}
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
            <img src={scenarios[activeScenario]} style={{ maxWidth: demoMaxWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
}
