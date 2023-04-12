'use client';
import Image from 'next/image';
import styles from './page.module.css';

const LOGO_SIZES = {
  M: {
    width: 100,
    height: 24,
  },
  L: {
    width: 183,
    height: 44,
  },
} as const;

export function Logo(props: { size: 'M' | 'L' }) {
  return (
    <Image
      src="/shape.svg"
      alt="Shape Logo"
      className={styles.shapeLogo}
      width={LOGO_SIZES[props.size].width}
      height={LOGO_SIZES[props.size].height}
      priority
    />
  );
}
