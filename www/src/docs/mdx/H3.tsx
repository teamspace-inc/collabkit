import React, { useEffect, useState } from 'react';
import * as styles from '../../styles/docs/Docs.css';
import { proxy } from 'valtio';

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

type AnchorStore = { anchors: { [id: string]: { text: string; link: string } } };

export const anchorStore = proxy<AnchorStore>({ anchors: {} });

function useAnchor(children: React.ReactNode) {
  const [anchor, setAnchor] = useState('');
  const [link, setLink] = useState('');
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (typeof children !== 'string') {
      return;
    }
    setAnchor(getAnchor(children));
    setLink(`#${anchor}`);
    anchorStore.anchors = {
      ...anchorStore.anchors,
      [anchor]: { text: children, link: `#${anchor}` },
    };
  }, [children, setAnchor, setLink, didMount]);

  return { link, anchor };
}

export const H3 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => {
  const { anchor, link } = useAnchor(children);

  return (
    <h3 {...props}>
      <a id={anchor} className={styles.anchorHeaderOffset} />
      {children}{' '}
      <a href={link} className={styles.copyLink}>
        {'#'}
      </a>
    </h3>
  );
};
