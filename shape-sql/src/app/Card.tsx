'use client';
import styles from '@/app/Card.module.css';

export function Card(props: { children: React.ReactNode }) {
  return <div className={styles.card}>{props.children}</div>;
}
