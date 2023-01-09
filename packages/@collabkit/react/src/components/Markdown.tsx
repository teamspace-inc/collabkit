import React from 'react';
import { useRemarkSync } from 'react-remark';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';

export const Markdown = React.memo(function Markdown(props: { className?: string; body: string }) {
  const reactContent = useRemarkSync(props.body);
  return <div className={props.className}>{reactContent}</div>;
});
