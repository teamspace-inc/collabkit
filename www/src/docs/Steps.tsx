import { ComponentPropsWithoutRef } from 'react';
import * as styles from '../styles/docs/Docs.css';

export function Steps(props: ComponentPropsWithoutRef<'div'>) {
  return <div className={styles.steps} {...props} />;
}
