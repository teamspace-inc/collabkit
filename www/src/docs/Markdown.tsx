import React from 'react';
import { useRemarkSync } from 'react-remark';
import { remark } from 'remark';
import rehypeReact from 'rehype-react';

function useMarkdown(md: string) {
  console.log(remark().processSync(md));
}

export const Markdown = React.memo(function Markdown(props: { className?: string; body: string }) {
  useMarkdown(props.body);
  const reactContent = useRemarkSync(props.body);
  return <div className={props.className}>{reactContent}</div>;
});
