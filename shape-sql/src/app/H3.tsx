'use client';
import styles from './page.module.css';

export function H3(props: { children: React.ReactNode }) {
  return <h3 className={styles.h3}>{props.children}</h3>;
}
