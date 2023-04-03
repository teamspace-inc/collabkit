import { createStitches, createTheme, defaultThemeMap } from '@stitches/react';
import {
  sand,
  blue,
  blueA,
  sandA,
  lime,
  yellow,
  sky,
  amber,
  violet,
  whiteA,
  limeA,
  yellowA,
  skyA,
  amberA,
  violetA,
} from '@radix-ui/colors';

export const neuronTheme = {
  accent: sandA.sandA8,
  brushFill: blueA.blueA5,
  brushStroke: blueA.blueA9,
  selectStroke: blue.blue9,
  editingStroke: blue.blue6,
  selectFill: blueA.blueA4,
  background: 'white',
  foreground: 'red',
};

export const DEFAULT_ICON_COLOR = sand.sand10;
export const LIGHT_ICON_COLOR = sand.sand8;

export const { styled, config } = createStitches({
  themeMap: {
    ...defaultThemeMap,
  },
  theme: {
    colors: {
      ...blueA,
      ...blue,
      ...sand,
      ...sandA,
      ...whiteA,
      text: sand.sand12,
      background: sand.sand1,
      sidebarBackground: sand.sand2,
      buttonPrimaryIcon: sand.sand1,
      buttonPrimaryBackground: sand.sand12,
      buttonPrimaryBackgroundHover: sand.sand4,
      linkBackground: sandA.sandA4,
      linkText: sand.sand12,
      buttonPrimaryText: sand.sand11,
      placeholderText: sandA.sandA8,
      sidebarText: sand.sand11,
      secondaryText: sand.sand9,
      disabledText: sand.sand10,
      hover: 'rgba(144, 144, 144, .1)',
      border: 'rgba(144, 144, 144, .32)',
      active: blue.blue9,
      cardBackground: 'white',
      searchBarBackground: sand.sand1,
      toolbarText: sand.sand4,
      toolbarSecondaryText: sand.sand6,
      toolbarSelectedBackground: whiteA.whiteA6,
      toolbarSelectedText: whiteA.whiteA12,
      buttonSelectedBackground: blueA.blueA4,
      buttonSelectedHoveringBackground: blueA.blueA4,
      buttonSelectedText: blue.blue9,
      buttonHoveringBackground: sandA.sandA4,
      contextMenuBackground: sand.sand12,
      contextMenuHoverBackground: whiteA.whiteA8,
      sidebarSelectedBackground: sand.sand4,
      inputBackground: 'white',
      inputBorderEditing: blueA.blueA6,
      inputPlaceholder: sand.sand7,
      scrim: 'rgba(0, 0, 0, .05)',
      tooltipBackground: sand.sand12,
      tooltipText: sand.sand1,
      tooltipTextSecondary: sand.sand9,
      arrow: sand.sand5,
      canvas: sand.sand1,
      tableHandleBackground: sand.sand4,
    },
    /** Application UI **/
    ui: {
      text: sand.sand12,
      background: 'white',
      secondaryText: sand.sand8,
      tertiaryText: sand.sand10,
      activeIcon: blue.blue10,
      selection: blueA.blueA5,
      selectionText: sandA.sandA12,
      divider: sandA.sandA4,
      shadow: `0px 2px 6px ${sandA.sandA1}, 0px 0px 0px 0.5px ${sandA.sandA2}, 0px -0.5px 0px ${sandA.sandA1}, 0px 0.5px 0px ${sandA.sandA2}, 0px 5.5px 11px ${sandA.sandA3}`,
      icon: sand.sand8,
      iconHover: sand.sand10,
    },
    shadows: {
      0: `0px 0px 5.5px ${sandA.sandA3}`,
      1: `0px 2.75px 5.5px ${sandA.sandA2}, 0px 1px 0px 0.5px ${sandA.sandA2}, 0px -0.5px 0px ${sandA.sandA1}, 0px 0.5px 0px ${sandA.sandA2}`,
      2: `0px 2px 6px ${sandA.sandA1}, 0px 0px 0px 0.5px ${sandA.sandA2}, 0px -0.5px 0px ${sandA.sandA1}, 0px 0.5px 0px ${sandA.sandA2}, 0px 5.5px 11px ${sandA.sandA3}`,
    },
    space: {
      0: '3px',
      1: '6px',
      2: '11px',
      3: '22px',
      4: '33px',
      5: '44px',
    },
    size: {
      0: '6px',
      1: '11px',
      2: '17px',
      3: '22px',
      4: '28px',
      5: '33px',
      sidebarWidth: '240px',
    },
    fontSizes: {
      0: '10px',
      1: '12px',
      2: '13px',
      3: '14px',
      4: '18px',
      tiny: '12px',
      small: '13px',
      h1: '23px',
      h2: '20px',
      h3: '17px',
      p: '14px',
    },
    fonts: {
      ui: '"Noto", "Inter", system-ui, sans-serif',
      body: '"Noto", "Inter", system-ui, sans-serif',
      mono: '"Roboto Mono", monospace',
    },
    fontWeights: {
      0: '400',
      1: '500',
      2: '700',
    },
    lineHeights: {
      0: '22px',
      1: '22px',
      2: '22px',
      3: '22px',
      4: '22px',
      tiny: '17px',
      small: '19px',
      p: '22px',
      h1: '33px',
      h2: '30px',
      h3: '27px',
    },
    letterSpacings: {},
    sizes: {},
    borderWidths: {
      0: '$1',
    },
    borderStyles: {},
    radii: {
      0: '3px',
      1: '6px',
      2: '11px',
      shape: '6px',
    },
    zIndices: {},
    transitions: {},
  },
  media: {
    micro: '(max-width: 370px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
  },
  utils: {
    zStrokeWidth: () => (value: number) => ({
      strokeWidth: `calc(${value}px / var(--camera-zoom))`,
    }),
  },
});

const limeCard = createTheme({
  colors: {
    cardBackground: lime.lime5,
    linkBackground: limeA.limeA4,
  },
});

const yellowCard = createTheme({
  colors: {
    cardBackground: yellow.yellow5,
    linkBackground: yellowA.yellowA4,
  },
});

const skyCard = createTheme({
  colors: {
    cardBackground: sky.sky5,
    linkBackground: skyA.skyA4,
  },
});

const amberCard = createTheme({
  colors: {
    cardBackground: amber.amber5,
    linkBackground: amberA.amberA4,
  },
});

const violetCard = createTheme({
  colors: {
    cardBackground: violet.violet5,
    linkBackground: violetA.violetA4,
  },
});

const sandCard = createTheme({
  colors: {
    cardBackground: sand.sand2,
  },
});

export const cardThemes = {
  lime: limeCard,
  yellow: yellowCard,
  sky: skyCard,
  amber: amberCard,
  violet: violetCard,
  sand: sandCard,
};

export default styled;
