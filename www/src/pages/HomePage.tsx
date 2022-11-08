import { Contact } from '../home/Contact';
import { Demos } from '../home/Demos';
import { Header } from '../home/Header';
import { Hero } from '../home/Hero';
import { Code } from '../home/Code';
import { Plans } from '../home/Plans';
import { light } from '../styles/Theme.css';
import { website } from '../styles/Website.css';
import { Components } from '../home/Components';
import { Customisable } from '../home/Customisable';
import { SmallHero } from '../home/small/SmallHero';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { SmallDemos } from '../home/small/SmallDemos';
import { SmallComponents } from '../home/small/SmallComponents';
import { SmallCustomisable } from '../home/small/SmallCustomisable';
import { SmallCode } from '../home/small/SmallCode';

export function HomePage() {
  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={`${website} ${light}`}>
      {isSmallScreen ? (
        <>
          <SmallHero />
          <SmallDemos />
          <SmallComponents />
          <SmallCustomisable />
          <SmallCode />
        </>
      ) : (
        <>
          <Header />
          <Hero />
          <Demos />
          <Components />
          <Customisable />
          <Code />
          <Plans />
          <Contact />
        </>
      )}
    </div>
  );
}
