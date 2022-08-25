import {
  amber,
  blue,
  bronze,
  brown,
  crimson,
  cyan,
  gold,
  grass,
  gray,
  green,
  indigo,
  lime,
  mauve,
  mint,
  olive,
  orange,
  pink,
  plum,
  purple,
  red,
  sage,
  sand,
  sky,
  slate,
  teal,
  tomato,
  violet,
  yellow,
} from '@radix-ui/colors';

import shuffle from './utils/shuffle';

const colors = {
  amber,
  blue,
  bronze,
  brown,
  crimson,
  cyan,
  gold,
  grass,
  gray,
  green,
  indigo,
  lime,
  mint,
  olive,
  orange,
  pink,
  plum,
  purple,
  mauve,
  red,
  sage,
  sand,
  sky,
  slate,
  teal,
  tomato,
  violet,
  yellow,
};

function getRandomColor(): Color {
  return shuffle(Object.keys(colors))[0] as Color;
}

function getShade(color: Color, shade: number) {
  const colorKey = colors[color];
  const shadeKey = Object.keys(colorKey).find((shadeKey) => shadeKey.endsWith(`${shade}`));
  return colorKey[shadeKey as keyof typeof colorKey];
}

export type Color = keyof typeof colors;

export { getRandomColor, getShade };
