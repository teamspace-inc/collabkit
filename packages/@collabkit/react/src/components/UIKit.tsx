import { createStitches, createTheme } from '@stitches/react';
import {
  gray,
  green,
  tomato,
  red,
  crimson,
  pink,
  plum,
  purple,
  violet,
  indigo,
  blue,
  cyan,
  teal,
  grass,
  orange,
  brown,
  grayDark,
  blueDark,
} from '@radix-ui/colors';

const neutral = {
  neutral1: '$gray1',
  neutral2: '$gray2',
  neutral3: '$gray3',
  neutral4: '$gray4',
  neutral5: '$gray5',
  neutral6: '$gray6',
  neutral7: '$gray7',
  neutral8: '$gray8',
  neutral9: '$gray9',
  neutral10: '$gray10',
  neutral11: '$gray11',
  neutral12: '$gray12',
};

const neutralDark = {
  neutral1: '$grayDark1',
  neutral2: '$grayDark2',
  neutral3: '$grayDark3',
  neutral4: '$grayDark4',
  neutral5: '$grayDark5',
  neutral6: '$grayDark6',
  neutral7: '$grayDark7',
  neutral8: '$grayDark8',
  neutral9: '$grayDark9',
  neutral10: '$grayDark10',
  neutral11: '$grayDark11',
  neutral12: '$grayDark12',
};

export const AVATAR_SIZE = 24;

export const { styled, css, theme } = createStitches({
  theme: {
    fontSize: {
      ['0']: '11px',
      ['1']: '12px',
      ['2']: '13px',
      ['3']: '16px',
    },
    lineHeights: {
      ['0']: '18px',
      ['1']: '18px',
      ['2']: '18px',
    },
    fontWeights: {
      ['0']: 400,
      ['1']: 700,
      ['2']: 700,
    },
    radii: {
      ['0']: '4px',
      ['1']: '12px',
      ['2']: '16px',
    },
    padding: {
      ['0']: '6px',
      ['1']: '8px',
      ['2']: '16px',
      ['3']: '24px',
      ['4']: '32px',
    },
    sizes: {
      sendButton: '24px',
      threadWidth: '260px',
      threadPreviewWidth: '248px',
      pinSize: '24px',
    },
    space: {
      ['0']: '0px',
      ['1']: '4px',
      ['2']: '8px',
      ['3']: '12px',
      ['4']: '16px',
    },
    colors: {
      primaryText: '$neutral12',
      secondaryText: '$neutral9',

      typingDot: '$neutral9',

      primaryButtonBackground: '$neutral1',
      composerButtonBackground: '$neutral12',
      composerBackground: 'transparent',

      bubbleHoverBackground: '$neutral4',
      selectionBackground: '$accent10',

      borderColor: '$neutral4',

      ...gray,
      ...green,

      accent1: '$green1',
      accent2: '$green2',
      accent3: '$green3',
      accent4: '$green4',
      accent5: '$green5',
      accent6: '$green6',
      accent7: '$green7',
      accent8: '$green8',
      accent9: '$green9',
      accent10: '$green10',
      accent11: '$green11',
      accent12: '$green12',

      ...neutral,
    },
  },
});

export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    accent1: '$blueDark1',
    accent2: '$blueDark2',
    accent3: '$blueDark3',
    accent4: '$blueDark4',
    accent5: '$blueDark5',
    accent6: '$blueDark6',
    accent7: '$blueDark7',
    accent8: '$blueDark8',
    accent9: '$blueDark9',
    accent10: '$blueDark10',
    accent11: '$blueDark11',
    accent12: '$blueDark12',
    ...neutralDark,
  },
});

export const tomatoTheme = createTheme({
  colors: {
    ...gray,
    ...tomato,
    accent1: '$tomato1',
    accent2: '$tomato2',
    accent3: '$tomato3',
    accent4: '$tomato4',
    accent5: '$tomato5',
    accent6: '$tomato6',
    accent7: '$tomato7',
    accent8: '$tomato8',
    accent9: '$tomato9',
    accent10: '$tomato10',
    accent11: '$tomato11',
    accent12: '$tomato12',
    ...neutral,
  },
});

export const redTheme = createTheme({
  colors: {
    ...gray,
    ...red,
    accent1: '$red1',
    accent2: '$red2',
    accent3: '$red3',
    accent4: '$red4',
    accent5: '$red5',
    accent6: '$red6',
    accent7: '$red7',
    accent8: '$red8',
    accent9: '$red9',
    accent10: '$red10',
    accent11: '$red11',
    accent12: '$red12',
    ...neutral,
  },
});

export const crimsonTheme = createTheme({
  colors: {
    ...gray,
    ...crimson,
    accent1: '$crimson1',
    accent2: '$crimson2',
    accent3: '$crimson3',
    accent4: '$crimson4',
    accent5: '$crimson5',
    accent6: '$crimson6',
    accent7: '$crimson7',
    accent8: '$crimson8',
    accent9: '$crimson9',
    accent10: '$crimson10',
    accent11: '$crimson11',
    accent12: '$crimson12',
    ...neutral,
  },
});

export const pinkTheme = createTheme({
  colors: {
    ...gray,
    ...pink,
    accent1: '$pink1',
    accent2: '$pink2',
    accent3: '$pink3',
    accent4: '$pink4',
    accent5: '$pink5',
    accent6: '$pink6',
    accent7: '$pink7',
    accent8: '$pink8',
    accent9: '$pink9',
    accent10: '$pink10',
    accent11: '$pink11',
    accent12: '$pink12',
    ...neutral,
  },
});

export const plumTheme = createTheme({
  colors: {
    ...gray,
    ...plum,
    accent1: '$purple',
    accent2: '$plum2',
    accent3: '$plum3',
    accent4: '$plum4',
    accent5: '$plum5',
    accent6: '$plum6',
    accent7: '$plum7',
    accent8: '$plum8',
    accent9: '$plum9',
    accent10: '$plum10',
    accent11: '$plum11',
    accent12: '$plum12',
    ...neutral,
  },
});

export const purpleTheme = createTheme({
  colors: {
    ...gray,
    ...purple,
    accent1: '$purple1',
    accent2: '$purple2',
    accent3: '$purple3',
    accent4: '$purple4',
    accent5: '$purple5',
    accent6: '$purple6',
    accent7: '$purple7',
    accent8: '$purple8',
    accent9: '$purple9',
    accent10: '$purple10',
    accent11: '$purple11',
    accent12: '$purple12',
    ...neutral,
  },
});

// write out violetTheme
export const violetTheme = createTheme({
  colors: {
    ...gray,
    ...violet,
    accent1: '$violet1',
    accent2: '$violet2',
    accent3: '$violet3',
    accent4: '$violet4',
    accent5: '$violet5',
    accent6: '$violet6',
    accent7: '$violet7',
    accent8: '$violet8',
    accent9: '$violet9',
    accent10: '$violet10',
    accent11: '$violet11',
    accent12: '$violet12',
    ...neutral,
  },
});

export const indigoTheme = createTheme({
  colors: {
    ...gray,
    ...indigo,
    accent1: '$indigo1',
    accent2: '$indigo2',
    accent3: '$indigo3',
    accent4: '$indigo4',
    accent5: '$indigo5',
    accent6: '$indigo6',
    accent7: '$indigo7',
    accent8: '$indigo8',
    accent9: '$indigo9',
    accent10: '$indigo10',
    accent11: '$indigo11',
    accent12: '$indigo12',
    ...neutral,
  },
});

export const blueTheme = createTheme({
  colors: {
    ...gray,
    ...blue,
    accent1: '$blue1',
    accent2: '$blue2',
    accent3: '$blue3',
    accent4: '$blue4',
    accent5: '$blue5',
    accent6: '$blue6',
    accent7: '$blue7',
    accent8: '$blue8',
    accent9: '$blue9',
    accent10: '$blue10',
    accent11: '$blue11',
    accent12: '$blue12',
    ...neutral,
  },
});

export const cyanTheme = createTheme({
  colors: {
    ...gray,
    ...cyan,
    accent1: '$cyan1',
    accent2: '$cyan2',
    accent3: '$cyan3',
    accent4: '$cyan4',
    accent5: '$cyan5',
    accent6: '$cyan6',
    accent7: '$cyan7',
    accent8: '$cyan8',
    accent9: '$cyan9',
    accent10: '$cyan10',
    accent11: '$cyan11',
    accent12: '$cyan12',
    ...neutral,
  },
});

export const tealTheme = createTheme({
  colors: {
    ...gray,
    ...teal,
    accent1: '$teal1',
    accent2: '$teal2',
    accent3: '$teal3',
    accent4: '$teal4',
    accent5: '$teal5',
    accent6: '$teal6',
    accent7: '$teal7',
    accent8: '$teal8',
    accent9: '$teal9',
    accent10: '$teal10',
    accent11: '$teal11',
    accent12: '$teal12',
    ...neutral,
  },
});

export const greenTheme = createTheme({
  colors: {
    ...gray,
    ...green,
    accent1: '$green1',
    accent2: '$green2',
    accent3: '$green3',
    accent4: '$green4',
    accent5: '$green5',
    accent6: '$green6',
    accent7: '$green7',
    accent8: '$green8',
    accent9: '$green9',
    accent10: '$green10',
    accent11: '$green11',
    accent12: '$green12',
    ...neutral,
  },
});

export const grassTheme = createTheme({
  colors: {
    ...gray,
    ...grass,
    accent1: '$grass1',
    accent2: '$grass2',
    accent3: '$grass3',
    accent4: '$grass4',
    accent5: '$grass5',
    accent6: '$grass6',
    accent7: '$grass7',
    accent8: '$grass8',
    accent9: '$grass9',
    accent10: '$grass10',
    accent11: '$grass11',
    accent12: '$grass12',
    ...neutral,
  },
});

export const orangeTheme = createTheme({
  colors: {
    ...gray,
    ...orange,
    accent1: '$orange1',
    accent2: '$orange2',
    accent3: '$orange3',
    accent4: '$orange4',
    accent5: '$orange5',
    accent6: '$orange6',
    accent7: '$orange7',
    accent8: '$orange8',
    accent9: '$orange9',
    accent10: '$orange10',
    accent11: '$orange11',
    accent12: '$orange12',
    ...neutral,
  },
});

export const brownTheme = createTheme({
  colors: {
    ...gray,
    ...brown,
    accent1: '$brown1',
    accent2: '$brown2',
    accent3: '$brown3',
    accent4: '$brown4',
    accent5: '$brown5',
    accent6: '$brown6',
    accent7: '$brown7',
    accent8: '$brown8',
    accent9: '$brown9',
    accent10: '$brown10',
    accent11: '$brown11',
    accent12: '$brown12',
    ...neutral,
  },
});

export const themes = {
  tomatoTheme,
  redTheme,
  crimsonTheme,
  pinkTheme,
  plumTheme,
  purpleTheme,
  violetTheme,
  indigoTheme,
  blueTheme,
  cyanTheme,
  tealTheme,
  greenTheme,
  grassTheme,
  orangeTheme,
  brownTheme,
};

export const themeIds = Object.keys(themes) as (keyof typeof themes)[];

export const FlexCenter = styled('div', {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
