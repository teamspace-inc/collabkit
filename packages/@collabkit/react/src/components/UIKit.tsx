import { createStitches } from '@stitches/react';
import { gray, green } from '@radix-ui/colors';

export const { styled, css, theme } = createStitches({
  theme: {
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
    },
  },
});
