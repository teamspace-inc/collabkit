'use client';
import styles from './SearchForm.module.css';
import { useCallback } from 'react';
import { query } from './actions';
import { useRouter } from 'next/navigation';

export function SearchForm() {
  const router = useRouter();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = await query(e.currentTarget.query.value);
    router.push(`/query/${id}`);
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="query" type="search" className={styles.input} placeholder="Ask me anything" />
    </form>
  );
}
