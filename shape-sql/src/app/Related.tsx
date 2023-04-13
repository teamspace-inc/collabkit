'use client';
import styles from './page.module.css';
import { Button } from './Button';

function Related() {
  return (
    <div className={styles.related}>
      <Button>How many new users joined this month?</Button>
      <Button>What are the total new users this year?</Button>
      <Button>How many new users did we get through Google searches?</Button>
    </div>
  );
}
