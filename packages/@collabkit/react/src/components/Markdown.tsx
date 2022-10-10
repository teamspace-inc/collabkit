import React, { useEffect, useRef } from 'react';
import { useRemark } from 'react-remark';

export function Markdown(props: {
  className?: string;
  body: string;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const mountedRef = useRef(false);
  const [reactContent, setMarkdownSource] = useRemark();

  // prevent flickr on initial render
  !mountedRef.current && setMarkdownSource(props.body);
  useEffect(() => {
    mountedRef.current = true;
    setMarkdownSource(props.body);
  }, [props.body]);

  return <div className={props.className}>{reactContent}</div>;
}
