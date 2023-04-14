'use client';
import styles from './page.module.css';

import { SearchForm } from '@/app/SearchForm';
import { Logo } from '@/app/Logo';

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Logo size="L" />
        <SearchForm />
      </div>
    </main>
  );
}
