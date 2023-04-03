import {
  tomato,
  tomatoA,
  crimson,
  crimsonA,
  pink,
  pinkA,
  violet,
  violetA,
  indigo,
  indigoA,
  cyan,
  cyanA,
  teal,
  tealA,
  grass,
  grassA,
  orange,
  orangeA,
  sand,
  sandA,
  lime,
  yellow,
  sky,
  amber,
} from '@radix-ui/colors';
import { cardThemes } from 'styles/stitches.config';

export const ClientColors = {
  tomato,
  crimson,
  pink,
  violet,
  indigo,
  cyan,
  teal,
  grass,
  orange,
};

export type CardColor = keyof typeof CardColors;

export type ClientColor = keyof typeof ClientColors;

export const CardColors = {
  lime: {
    label: 'Lime',
    color: lime.lime12,
    paletteColor: lime.lime5,
    backgroundColor: lime.lime3,
    theme: cardThemes.lime,
  },
  yellow: {
    label: 'Yellow',
    color: yellow.yellow12,
    paletteColor: yellow.yellow5,
    backgroundColor: yellow.yellow3,
    theme: cardThemes.yellow,
  },
  sky: {
    label: 'Sky',
    color: sky.sky12,
    paletteColor: sky.sky5,
    backgroundColor: sky.sky3,
    theme: cardThemes.sky,
  },
  violet: {
    label: 'Violet',
    color: violet.violet12,
    paletteColor: violet.violet5,
    backgroundColor: violet.violet3,
    theme: cardThemes.violet,
  },
  amber: {
    label: 'Amber',
    color: amber.amber12,
    paletteColor: amber.amber5,
    backgroundColor: amber.amber3,
    theme: cardThemes.amber,
  },
  sand: {
    label: 'Default',
    color: sand.sand12,
    paletteColor: sand.sand2,
    backgroundColor: sand.sand5,
    theme: cardThemes.sand,
  },
};

// stored outside the object as it's
// not stored in the item
export const DEFAULT_CARD_COLOR = {
  label: 'Default',
  color: sand.sand12,
  paletteColor: sand.sand1,
  backgroundColor: sand.sand1,
};

// commented out colors are reserved / excluded
export const ClientColorVariants = {
  sand: {
    backgroundColor: sand.sand10,
    borderColor: sand.sand9,
    color: sand.sand1,
    textSelectionColor: sandA.sandA5,
    selectionColor: sandA.sandA3,

    '&:after': {
      backgroundColor: sand.sand9,
    },
  },

  tomato: {
    backgroundColor: tomato.tomato10,
    borderColor: tomato.tomato9,
    color: tomato.tomato1,
    textSelectionColor: tomatoA.tomatoA5,
    selectionColor: tomatoA.tomatoA3,

    '&:after': {
      backgroundColor: tomato.tomato9,
    },
  },
  // too close to crimson, reserved for UI
  // red: {
  // },
  crimson: {
    backgroundColor: crimson.crimson10,
    borderColor: crimson.crimson9,
    color: crimson.crimson1,
    textSelectionColor: crimsonA.crimsonA5,
    selectionColor: crimsonA.crimsonA3,

    '&:after': {
      backgroundColor: crimson.crimson9,
    },
  },
  pink: {
    backgroundColor: pink.pink10,
    borderColor: pink.pink9,
    color: pink.pink1,
    textSelectionColor: pinkA.pinkA5,
    selectionColor: pinkA.pinkA3,

    '&:after': {
      backgroundColor: pink.pink9,
    },
  },
  // too close to pink & purple
  // plum: {
  //   backgroundColor: plum.plum10,
  //   borderColor: plum.plum10,
  //   color: plum.plum1,
  //   textSelectionColor: plumA.plumA5,
  //   selectionColor: plumA.plumA3,
  // },
  // too close to violet
  // purple: {
  // },
  violet: {
    backgroundColor: violet.violet10,
    borderColor: violet.violet9,
    color: violet.violet1,
    textSelectionColor: violetA.violetA5,
    selectionColor: violetA.violetA3,

    '&:after': {
      backgroundColor: violet.violet9,
    },
  },
  indigo: {
    backgroundColor: indigo.indigo10,
    borderColor: indigo.indigo9,
    color: indigo.indigo1,
    textSelectionColor: indigoA.indigoA5,
    selectionColor: indigoA.indigoA3,

    '&:after': {
      backgroundColor: indigo.indigo9,
    },
  },
  // reserved for UI
  // blue: {
  // },
  cyan: {
    backgroundColor: cyan.cyan10,
    borderColor: cyan.cyan9,
    color: cyan.cyan1,
    textSelectionColor: cyanA.cyanA5,
    selectionColor: cyanA.cyanA3,

    '&:after': {
      backgroundColor: cyan.cyan9,
    },
  },
  teal: {
    backgroundColor: teal.teal10,
    borderColor: teal.teal9,
    color: teal.teal1,
    textSelectionColor: tealA.tealA5,
    selectionColor: tealA.tealA3,

    '&:after': {
      backgroundColor: teal.teal9,
    },
  },
  // reserved for UI
  // green: {
  // },
  grass: {
    backgroundColor: grass.grass10,
    borderColor: grass.grass9,
    color: grass.grass1,
    textSelectionColor: grassA.grassA5,
    selectionColor: grassA.grassA3,

    '&:after': {
      backgroundColor: grass.grass9,
    },
  },
  // looks terrible
  // brown: {
  // },
  orange: {
    backgroundColor: orange.orange10,
    borderColor: orange.orange9,
    color: orange.orange1,
    textSelectionColor: orangeA.orangeA5,
    selectionColor: orangeA.orangeA3,

    '&:after': {
      backgroundColor: orange.orange9,
    },
  },
} as const;

export function randomColor(): ClientColor {
  const colors = Object.keys(ClientColors);
  const i = Math.round(Math.random() * 100) % colors.length;
  return colors[i] as ClientColor;
}
