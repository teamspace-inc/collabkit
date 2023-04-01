import { styled } from '@stitches/react';

export const Highlight = styled('span', {
  variants: {
    isHighlighted: {
      true: {
        background: '$ui$selection',
      },
    },
  },
});

// This can be improved if we accept all the matched terms
// from the search engine and highlight those.
export function getHighlights(text: string, highlight: string) {
  // Split on highlight term and include term into parts, ignore case
  // Replace newlines with spaces so results look better
  if (!text || text.length === 0) {
    return;
  }

  const parts = text.replace(/\n/g, ' ').split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span>
      {' '}
      {parts.map((part, i) => (
        <Highlight key={i} isHighlighted={part.toLowerCase() === highlight.toLowerCase()}>
          {part}
        </Highlight>
      ))}{' '}
    </span>
  );
}
