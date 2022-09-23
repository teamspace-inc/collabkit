import { useEffect } from 'react';
import { useRemark } from 'react-remark';

export function Markdown(props: {
  className?: string;
  body: string;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(props.body);
  }, [props.body]);

  return <div className={props.className}>{reactContent}</div>;
}
