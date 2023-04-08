'use client';
import styles from './page.module.css';
import { useCallback } from 'react';
import { store } from './store';

export function SearchForm() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.query.value;
    console.log(query);
    if (!query) {
      return;
    }

    console.log(
      'submitted form',
      window.location.host,
      window.location.hostname,
      window.location.protocol,
      query
    );

    const url = new URL(window.location.protocol + '//' + window.location.host + '/query');
    url.searchParams.set('query', query);
    fetch(url)
      .then((response) => {
        response.json().then((data) => (store.response = { data: data.response }));
      })
      .catch(console.error)
      .catch(console.error);
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="query" type="search" className={styles.input} placeholder="Ask me anything" />
    </form>
  );
}
