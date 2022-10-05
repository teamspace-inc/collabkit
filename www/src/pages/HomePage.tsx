import { useState } from 'react';
import { ContactUs } from '../home/ContactUs';
import { Customise } from '../home/Customise';
import { HardWork } from '../home/HardWork';
import { Header } from '../home/Header';
import { Hero } from '../home/Hero';
import { JustAFewLinesOfCode } from '../home/JustAFewLinesOfCode';
import { Plans } from '../home/Plans';
import { WorksWith } from '../home/WorksWith';
import { VStack } from '../UIKit';

export function HomePage() {
  const [invertFilter, setInvertFilter] = useState(0);

  return (
    <VStack style={{ alignItems: 'center' }}>
      <Header invertFilter={invertFilter} />
      <Hero />
      <WorksWith />
      <JustAFewLinesOfCode setInvertFilter={setInvertFilter} />
      <HardWork />
      <Customise />
      <Plans />
      <ContactUs />
    </VStack>
  );
}
