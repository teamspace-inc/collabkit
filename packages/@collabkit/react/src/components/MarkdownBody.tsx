import { styled } from '@stitches/react';
import React from 'react';
import reactStringReplace from 'react-string-replace';

export const MARKDOWN_LINK_REGEXP = /\[(.*)\]\((.*)\)/;

export const A = styled('a', {
  fontWeight: '700',
  color: '$colors$primaryText',
  textDecoration: 'none',
});

export function MarkdownBody(props: { body: string; onLinkClick?: (e: React.MouseEvent) => void }) {
  return (
    <>
      {reactStringReplace(props.body, /(\[.*\]\(.*\))/g, (match, i) => {
        // parse and render markdown as an A tag
        const linkMatches = match.match(MARKDOWN_LINK_REGEXP);
        if (linkMatches && linkMatches[0]) {
          return (
            <A key={i} onClick={props.onLinkClick} href={linkMatches[2]}>
              {linkMatches[1]}
            </A>
          );
        }

        // todo check if it matches a profile before bolding
        return (
          <span key={i} style={{ fontWeight: 'bold' }}>
            {match}
          </span>
        );
      })}
    </>
  );
}
