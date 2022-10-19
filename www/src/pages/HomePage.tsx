import { useState } from 'react';
import { Contact } from '../home/Contact';
import { Demos } from '../home/Demos';
import { Header } from '../home/Header';
import { Hero } from '../home/Hero';
import { Code } from '../home/Code';
import { Plans } from '../home/Plans';
import { light } from '../styles/Theme.css';
import { website } from '../styles/Website.css';

export function HomePage() {
  const [invertFilter, setInvertFilter] = useState(0);

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      className={`${website} ${light}`}
    >
      <Header invertFilter={invertFilter} />
      <Hero />
      <Demos setInvertFilter={setInvertFilter} />
      <Code setInvertFilter={setInvertFilter} />
      <Plans />
      <Contact />
    </div>
  );
}
