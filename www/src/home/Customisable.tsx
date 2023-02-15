import { useState } from 'react';
import { dark, vars } from '../styles/Theme.css';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import * as styles from '../styles/home/Demos.css';
import { ThemeProvider } from '@collabkit/react';
import { controls, modal } from '../styles/home/Customisable.css';
import { ToggleButtonGroup } from './ToggleButtonGroup';
import { COMPONENTS } from './Components';
import { purpleBg } from '../styles/Website.css';

const padding = { padding: '0px 28px' };

export function Customisable() {
  const { ref } = useHeaderStyle({
    backgroundColor: vars.color.aubergine,
    theme: 'dark',
  });

  const [theme, setTheme] = useState(0);
  const [component, setComponent] = useState(0);

  return (
    <section ref={ref} className={`${dark} ${purpleBg}`} id="HowItWorks">
      <h1>Fully customisable</h1>
      <h3 className={styles.h3} style={{ marginBottom: 40 }}>
        Use a default theme or seamlesly integrate into your UI
      </h3>
      <div className={modal}>
        <div style={{ paddingBottom: 100, height: 400, overflow: 'hidden' }}>
          <ThemeProvider theme={theme === 0 ? 'light' : 'dark'}>
            {COMPONENTS[component].component}
          </ThemeProvider>
        </div>
        <div className={controls}>
          <ToggleButtonGroup
            title="Component"
            options={[
              { node: <div style={padding}>Thread</div>, value: 0 },
              { node: <div style={padding}>Inbox</div>, value: 1 },
            ]}
            value={component}
            onChange={setComponent}
          />
          <ToggleButtonGroup
            title="Theme"
            options={[
              {
                node: <div style={{ background: 'white' }} />,
                value: 0,
              },
              {
                node: <div style={{ background: vars.color.bgContrastLowest }} />,
                value: 1,
              },
            ]}
            value={theme}
            onChange={setTheme}
          />
        </div>
      </div>
    </section>
  );
}
