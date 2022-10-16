import { useState } from 'react';
import SidebarSvg from '../assets/Sidebar.svg';
import TableSvg from '../assets/Table.svg';
import ChartSvg from '../assets/Chart.svg';
import TextSvg from '../assets/Text.svg';
import { dark } from '../styles/Theme.css';
import { tab, tabs } from '../styles/Website.css';

const scenarios = {
  Pages: SidebarSvg,
  Tables: TableSvg,
  Charts: ChartSvg,
  Text: TextSvg,
  Lists: TextSvg,
  Canvas: TextSvg,
  Anywhere: TextSvg,
  Video: TextSvg,
};

type scenarioNames = keyof typeof scenarios;

export function HowItWorks() {
  const [activeScenario, setActiveScenario] = useState('Pages');
  const demoMaxWidth = window.innerWidth - 200;

  return (
    <section
      className={dark}
      id="HowItWorks"
      style={{
        background: '#35284A',
        color: 'white',
      }}
    >
      <h1>How it works</h1>
      <h3>CollabKit supports multiple interfaces is fully customisable</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '50px 1fr',
          alignSelf: 'start',
          gap: '40px',
          padding: '0px 100px',
          marginTop: '60px',
        }}
      >
        <div className={tabs}>
          {Object.keys(scenarios).map((scenario) => (
            <div
              onClick={() => setActiveScenario(scenario)}
              className={tab({ active: scenario === activeScenario })}
            >
              {scenario}
            </div>
          ))}
        </div>
        <div
          style={{
            alignSelf: 'start',
            display: 'grid',
            gridTemplateColumns: `repeat(${Object.keys(scenarios).length}, 1fr)`,
            gap: '40px',
          }}
        >
          {Object.keys(scenarios).map((scenario) => (
            // @ts-expect-error
            <img src={scenarios[scenario]} style={{ maxWidth: demoMaxWidth }} />
          ))}
        </div>
      </div>
    </section>
  );
}
