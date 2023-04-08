'use client';

import { IconContext, ThumbsUp, ThumbsDown } from '@phosphor-icons/react';
import styles from './FeedbackButtons.module.css';

export function FeedbackButtons() {
  return (
    <div className={styles.root}>
      <IconContext.Provider value={{ size: 16 }}>
        <div className={styles.button}>
          <ThumbsUp />
        </div>
        <div className={styles.divider} />
        <div className={styles.button}>
          <ThumbsDown />
        </div>
      </IconContext.Provider>
    </div>
  );
}
