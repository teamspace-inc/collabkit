import React, { useEffect, useState } from 'react';
function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}
export const H3 = ({
  children,
  onAnchor,
}: React.ComponentPropsWithoutRef<'h3'> & { onAnchor: (id: string, link: string) => void }) => {
  const [anchor, setAnchor] = useState('');
  const [link, setLink] = useState('');
  useEffect(() => {
    if (typeof children !== 'string') {
      return;
    }
    setAnchor(getAnchor(children));
    setLink(`#${anchor}`);
    onAnchor(anchor, link);
  }, [typeof children, setAnchor, setLink, onAnchor]);

  return (
    <h3 id={link}>
      <a href={link} className="anchor-link">
        {' '}
      </a>
      {children}
    </h3>
  );
};
