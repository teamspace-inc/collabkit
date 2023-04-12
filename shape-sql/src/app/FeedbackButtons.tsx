'use client';

import { IconContext, ThumbsUp, ThumbsDown } from '@phosphor-icons/react';
import styles from './FeedbackButtons.module.css';
import { cx } from './cx';

function Button(props: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ size: 16 }}>
      <div className={cx(styles.button, styles.size)}>
        <div className={styles.center}>{props.children}</div>
      </div>
    </IconContext.Provider>
  );
}

export function FeedbackButtons() {
  return (
    <div className={styles.root}>
      <Button>
        <ThumbsUp />
      </Button>
      <div className={styles.divider} />
      <Button>
        <ThumbsDown />
      </Button>
    </div>
  );
}
