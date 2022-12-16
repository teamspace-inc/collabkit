import React from 'react';
import { useRemarkSync } from 'react-remark';

export const Markdown = React.memo(function Markdown(props: {
  className?: string;
  body: string;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const reactContent = useRemarkSync(props.body);
  return <div className={props.className}>{reactContent}</div>;
});
