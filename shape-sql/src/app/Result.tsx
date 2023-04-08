'use client';
import styles from './page.module.css';
import { useSnapshot } from 'valtio';
import { store } from './store';

export function Result() {
  const { response } = useSnapshot(store);
  return <div className={styles.result}>{response?.data}</div>;
}
