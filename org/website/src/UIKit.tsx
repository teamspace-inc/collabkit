import { createStitches } from '@stitches/react';
import { grayDark, greenDark } from '@radix-ui/colors';

export const { styled, css, theme } = createStitches({
  theme: {
    colors: {
      ...grayDark,
      ...greenDark,

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

export const TextLeft = styled('div', {
  textAlign: 'left',
});

export const TextCenter = styled('div', {
  textAlign: 'center',
});

const gap = css({
  variants: {
    gap: {
      0: {
        gap: 0,
      },
      1: {
        gap: '1rem',
      },
      2: {
        gap: '2rem',
      },
      3: {
        gap: '3rem',
      },
    },
  },
});

const align = css({
  variants: {
    align: {
      center: {
        alignItems: 'center',
      },
    },
  },
});

const pad = css({
  variants: {
    pad: {
      0: {
        padding: 0,
      },
      1: {
        padding: '1rem',
      },
      2: {
        padding: '2rem',
      },
      3: {
        padding: '3rem',
      },
    },
  },
});

const shadow = css({
  variants: {
    shadow: {
      0: {
        boxShadow: 'none',
      },
      1: {
        boxShadow: '0px 5px 20px $accent9',
      },
    },
  },
});

const colors = css({
  variants: {
    type: {
      primary: {
        color: '$neutral12',
      },
      secondary: {
        color: '$neutral11',
      },
    },
  },
});

const fontSize = css({
  variants: {
    fontSize: {
      0: {
        fontSize: '1rem',
      },
      1: {
        fontSize: '1.25rem',
      },
      2: {
        fontSize: '1.563rem',
      },
      3: {
        fontSize: '1.953rem',
      },
    },
  },
});

export const Box = styled(
  'div',
  {
    background: '$neutral4',
    minHeight: '200px',
    width: '100%',

    variants: {
      round: {
        0: {
          borderRadius: '0px',
        },
        1: {
          borderRadius: '6px',
        },
        2: {
          borderRadius: '12px',
        },
        3: {
          borderRadius: '18px',
        },
      },
    },
  },
  pad,
  shadow
);

export const A = styled('a', {
  textDecoration: 'none',
  color: '$accent10',
});

const display = css({
  variants: {
    display: {
      block: {
        display: 'block',
      },
    },
  },
});

export const H1 = styled('h1', {}, colors);
export const H2 = styled('h2', {}, colors);
export const Text = styled('span', {}, colors, display, fontSize);

export const Spacer = styled('div', {
  flexGrow: 1,
});

export const VStack = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    align: {
      center: {
        justifyContent: 'center',
      },
    },
  },
  align,
  gap
);

export const Perspective = styled('div', {});

export const HStack = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'row',
  },
  align,
  gap
);

export const Slide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
});

export const MaxWidth = styled('div', {
  maxWidth: '1440px',
});

export const Center = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Grid = styled(
  'div',
  {
    display: 'grid',
    variants: {
      rows: {
        1: {
          gridTemplateRows: '1fr',
        },
        2: {
          gridTemplateRows: '1fr 1fr',
        },
      },
      cols: {
        1: {
          gridTemplateColumns: '1fr',
        },
        2: {
          gridTemplateColumns: '1fr 1fr',
        },
        3: {
          gridTemplateColumns: '1fr 1fr 1fr',
        },
        4: {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
        '2x1': {
          gridTemplateColumns: '2fr 1fr',
        },
        '1x2': {
          gridTemplateColumns: '1fr 2fr',
        },
      },
    },
  },
  gap,
  pad
);

export const Inset = styled('div', {
  padding: '2rem 2rem',
});

export const Code = styled('code', {
  fontFamily: 'Roboto Mono',
});

export const Button = styled('button', {
  cursor: 'pointer',
  borderRadius: 33,
  fontWeight: 600,
  fontSize: '1rem',
  border: 'none',
  lineHeight: 1,
  padding: '1rem 2rem',
  variants: {
    type: {
      cta: {
        color: 'white',
        backgroundColor: '$accent10',
        border: '1px solid $accent10',
      },
      secondary: {
        color: '$neutralDark10',
        border: '1px solid $neutral4',
        backgroundColor: 'transparent',
      },
    },
  },
});
