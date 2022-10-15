import { useState } from 'react';
import { ContactUs } from '../home/ContactUs';
import { Header } from '../home/Header';
import { Hero } from '../home/Hero';
import { HowItWorks } from '../home/HowItWorks';
import { JustAFewLinesOfCode } from '../home/JustAFewLinesOfCode';
import { Plans } from '../home/Plans';
import { light } from '../styles/Theme.css';
import { website } from '../styles/Website.css';

export function HomePage() {
  const [invertFilter, setInvertFilter] = useState(0);

  return (
    <div style={{ alignItems: 'center' }} className={`${website} ${light}`}>
      <Header invertFilter={invertFilter} />
      <Hero />
      <HowItWorks />
      <JustAFewLinesOfCode setInvertFilter={setInvertFilter} />
      <Plans />
      <ContactUs />
    </div>
  );
}
