import { dark, vars } from '../../styles/Theme.css';
import { button, h3OnPurple, purpleBg, vertical20, vertical40 } from '../../styles/Website.css';
import { Slider, SliderTrack, SliderThumb, SliderRange } from '@radix-ui/react-slider';
import {
  controls,
  modal,
  range,
  slider,
  sliderLabel,
  thumb,
  track,
} from '../../styles/home/Customisable.css';

import Theme1 from '../../assets/home/customisability/1.svg';
import Theme2 from '../../assets/home/customisability/2.svg';
import Theme3 from '../../assets/home/customisability/3.svg';
import Theme4 from '../../assets/home/customisability/4.svg';
import Theme5 from '../../assets/home/customisability/5.svg';
import Theme6 from '../../assets/home/customisability/6.svg';
import Theme7 from '../../assets/home/customisability/7.svg';
import { useState } from 'react';
import { usePreloadImages } from '../../hooks/usePreloadImages';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';
import { Link } from 'wouter';

const THEMES: { [x: string]: string } = {
  Theme1,
  Theme2,
  Theme3,
  Theme4,
  Theme5,
  Theme6,
  Theme7,
};

function ThemeSlider(props: { onChange: (theme: string) => void }) {
  return (
    <Slider
      className={slider}
      defaultValue={[0]}
      max={100}
      step={100 / 6}
      onValueChange={(value: number[]) => {
        const themeIndex = Math.floor(value[0] / 16);
        const theme = Object.keys(THEMES)[themeIndex];
        props.onChange(theme);
      }}
      aria-label="Theme"
    >
      <SliderTrack className={track}>
        <SliderRange className={range} />
      </SliderTrack>
      <SliderThumb className={thumb} />
    </Slider>
  );
}

export function SmallCustomisable() {
  const [theme, setTheme] = useState('Theme1');
  usePreloadImages({ imageUrls: Object.values(THEMES) });
  const { ref } = useHeaderStyle({ backgroundColor: vars.color.aubergine, theme: 'dark' });

  return (
    <section ref={ref} className={`${purpleBg} ${dark}`}>
      <div className={vertical40}>
        <div className={vertical20}>
          <h1>Fully Customisable</h1>
          <h3 className={h3OnPurple}>Use a default style of seamlessly integrate into your UI</h3>
        </div>
        <div className={modal}>
          <div style={{ position: 'relative', height: 394, width: 292 }}>
            <img style={{ position: 'absolute', left: 0 }} src={THEMES[theme]} />
          </div>
          <div className={`${controls}`}>
            <div className={vertical20}>
              <div className={sliderLabel}>Slide to change</div>
              <ThemeSlider onChange={setTheme} />
            </div>
          </div>
        </div>
        <Link to="/docs" className={button({ type: 'secondary', size: 'medium' })}>
          Find out more
        </Link>
      </div>
    </section>
  );
}
