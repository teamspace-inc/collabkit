import React, { createElement, Fragment, useEffect, useState } from 'react';
import rehypeReact from 'rehype-react';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

function MarkdownLink(props: any) {
  return <a {...props} />;
}

function useMarkdown(md: string) {
  const [reactContent, setReactContent] = useState<React.ReactNode>(null);
  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: MarkdownLink,
        },
      })
      .process(md)
      .then((file) => {
        setReactContent(file.result as React.ReactNode);
      });
  }, [md]);
  return reactContent;
}

export const Markdown = React.memo(function Markdown(props: { className?: string; body: string }) {
  const reactContent = useMarkdown(props.body);
  return <div className={props.className}>{reactContent}</div>;
});
