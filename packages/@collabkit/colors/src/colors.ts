export type Color =
  | 'amber'
  | 'blue'
  | 'brown'
  | 'crimson'
  | 'cyan'
  | 'grass'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'mint'
  | 'orange'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'red'
  | 'sky'
  | 'teal'
  | 'tomato'
  | 'violet'
  | 'yellow';

const colors: Record<Color, string> = {
  amber: 'hsla(41, 95%, 66%, 1)',
  blue: 'hsla(211, 94%, 62%, 1)',
  brown: 'hsla(28, 36%, 54%, 1)',
  crimson: 'hsla(342, 70%, 62%, 1)',
  cyan: 'hsla(192, 55%, 50%, 1)',
  grass: 'hsla(124, 30%, 53%, 1)',
  green: 'hsla(146, 34%, 49%, 1)',
  indigo: 'hsla(225, 70%, 59%, 1)',
  lime: 'hsla(74, 78%, 64%, 1)',
  mint: 'hsla(162, 71%, 78%, 1)',
  orange: 'hsla(23, 90%, 60%, 1)',
  pink: 'hsla(325, 60%, 59%, 1)',
  plum: 'hsla(291, 43%, 55%, 1)',
  purple: 'hsla(268, 50%, 58%, 1)',
  red: 'hsla(2, 73%, 62%, 1)',
  sky: 'hsla(194, 96%, 78%, 1)',
  teal: 'hsla(173, 45%, 46%, 1)',
  tomato: 'hsla(11, 71%, 58%, 1)',
  violet: 'hsla(11, 71%, 58%, 1)',
  yellow: 'hsla(52, 100%, 71%, 1)',
};

export function isColor(value: unknown): value is Color {
  return value != null && typeof value === 'string' && value in colors;
}

export function getRandomColor(): Color {
  const names = Object.keys(colors);
  return names[Math.floor(Math.random() * names.length)] as Color;
}

export function getProfileColor(color: Color) {
  return colors[color as Color];
}
