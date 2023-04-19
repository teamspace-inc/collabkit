'use client';
import styles from './Button.module.css';

export function Button(props: React.ComponentPropsWithoutRef<'button'>) {
  return <button className={styles.button} {...props} />;
}
