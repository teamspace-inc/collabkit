import { useState } from 'react';
import { dark, vars } from '../styles/Theme.css';
import { useInvertFilter } from '../hooks/useInvertFilter';
import * as styles from '../styles/home/Demos.css';
import { ThemeProvider, Thread } from '@collabkit/react';
import { controls, modal } from '../styles/home/Customisable.css';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export function Customisable(props: { setInvertFilter: (invert: number) => void }) {
  const { ref } = useInvertFilter(props);

  const [theme, setTheme] = useState('light');
  const [accent, setAccent] = useState('1');
  const [radius, setRadius] = useState('1');
  const [component, setComponent] = useState('1');

  return (
    <section ref={ref} className={`${dark} ${styles.section}`} id="HowItWorks">
      <h1>Fully customisable</h1>
      <h3 className={styles.h3}>Use a default theme or seamlesly integrate into your UI</h3>
      <div className={modal}>
        <div style={{ paddingBottom: 100 }}>
          <ThemeProvider theme={theme as 'light' | 'dark'}>
            <div style={{ width: '256px' }}>
              <Thread threadId="thread3" />
            </div>
          </ThemeProvider>
        </div>
        <div className={controls}>
          <ToggleButtonGroup
            title="Component"
            options={[
              { node: <div>1</div>, value: '1' },
              { node: <div>2</div>, value: '2' },
              { node: <div>3</div>, value: '3' },
            ]}
            value={component}
            onChange={setComponent}
          />
          <ToggleButtonGroup
            title="Theme"
            options={[
              {
                node: <div style={{ background: 'white' }} />,
                value: 'light',
              },
              {
                node: <div style={{ background: vars.color.bgContrastLowest }} />,
                value: 'dark',
              },
            ]}
            value={theme}
            onChange={setTheme}
          />
          <ToggleButtonGroup
            title="Accent"
            options={[
              { node: <div style={{ background: vars.color.bgContrastLowest }} />, value: '1' },
              { node: <div style={{ background: vars.color.red }} />, value: '2' },
              { node: <div style={{ background: vars.color.green }} />, value: '3' },
              { node: <div style={{ background: vars.color.blue }} />, value: '4' },
            ]}
            value={accent}
            onChange={setAccent}
          />
          <ToggleButtonGroup
            title="Radius"
            options={[
              { node: <div>0</div>, value: '1' },
              { node: <div>1</div>, value: '2' },
              { node: <div>2</div>, value: '3' },
              { node: <div>3</div>, value: '4' },
            ]}
            value={radius}
            onChange={setRadius}
          />
        </div>
      </div>
    </section>
  );
}
