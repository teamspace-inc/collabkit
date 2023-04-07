'use client';
import styles from './page.module.css';
import { PillButton } from './PillButton';

function Related() {
  return (
    <div className={styles.related}>
      <PillButton>How many new users joined this month?</PillButton>
      <PillButton>What are the total new users this year?</PillButton>
      <PillButton>How many new users did we get through Google searches?</PillButton>
    </div>
  );
}
