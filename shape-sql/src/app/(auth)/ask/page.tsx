'use client';
import c from '@/app/page.module.css';

import { SearchForm } from '@/app/SearchForm';
import { Logo } from '@/app/Logo';
import { cx } from '@/app/cx';

export default function Page() {
  return (
    <main className={cx(c.main, c['v-center'])}>
      <div className={cx(c.center, c.spacing)}>
        <Logo size="L" />
        <SearchForm />
      </div>
    </main>
  );
}
