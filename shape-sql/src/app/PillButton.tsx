'use client';
import styles from './page.module.css';

export function PillButton(props: { children: React.ReactNode }) {
  return <button className={styles.pillButton}>{props.children}</button>;
}
