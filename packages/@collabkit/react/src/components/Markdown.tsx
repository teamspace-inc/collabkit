import React, { useEffect } from 'react';
import { useRemark } from 'react-remark';

export function Markdown(props: { body: string; onLinkClick?: (e: React.MouseEvent) => void }) {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(props.body);
  }, [props.body]);

  return reactContent;
}
