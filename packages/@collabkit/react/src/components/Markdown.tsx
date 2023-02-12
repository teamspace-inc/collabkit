import React, { createElement, Fragment } from 'react';
import rehypeReact from 'rehype-react';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { MarkdownLink } from './MarkdownLink';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const COMPILER = canUseDOM
  ? unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: MarkdownLink,
        },
      })
  : { processSync: () => ({ result: null }) };

export const Markdown = React.memo(function Markdown(props: { className?: string; body: string }) {
  const reactContent = COMPILER.processSync(props.body).result;
  return reactContent ? (
    <div data-testid="collabkit-markdown" className={props.className}>
      {reactContent}
    </div>
  ) : null;
});

export default Markdown;
