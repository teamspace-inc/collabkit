import React, { createElement, Fragment } from 'react';
import rehypeReact from 'rehype-react';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { ComposerPin } from '@collabkit/editor';

function MarkdownLink(props: any) {
  if (props.href.startsWith('#PIN')) {
    return <ComposerPin id={'foo'} />;
  }
  return <a {...props} />;
}

export const Markdown = React.memo(function Markdown(props: { className?: string; body: string }) {
  const reactContent = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MarkdownLink,
      },
    })
    .processSync(props.body).result;
  return reactContent ? (
    <div data-testId="collabkit-markdown" className={props.className}>
      {reactContent}
    </div>
  ) : null;
});
