import React from 'react';
import { sand } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

const { styled } = createStitches({
  theme: {
    fonts: {},
    space: {},
    sizes: {},
    fontSizes: {},
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    radii: {},
    zIndices: {},
    colors: {
      gray100: sand.sand1,
      gray200: sand.sand4,
      gray300: 'hsl(206 6% 56%)',
      gray400: 'hsl(206 6% 44%)',
      violet100: 'hsl(252 87% 96%)',
      violet200: 'hsl(252 83% 87%)',
      violet300: 'hsl(252 62% 54%)',
      violet400: 'hsl(250 55% 48%)',

      // token aliases
      background: 'white',
      input: '$gray100',
      line: '$gray200',
      text: '$gray400',
      accent: '$violet300',
    },
  },
});

export function CollabKitPlayground() {
  return (
    <div style={{ padding: 22 }}>
      <h1 style={{ padding: 11, paddingBottom: 0 }}>CollabKit</h1>
      {/* <Thread
        timeline={store.timelines['thread-1']}
        profiles={store.profiles}
        onSend={events.onSend}
      /> */}
    </div>
  );
}
