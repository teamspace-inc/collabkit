import React from 'react';
import * as styles from '../theme/components/NewIndicator.css';

export function NewIndicator() {
  return (
    <div className={styles.root}>
      <div className={styles.line} />
      <span className={styles.textInlay}>New</span>
    </div>
  );
}
