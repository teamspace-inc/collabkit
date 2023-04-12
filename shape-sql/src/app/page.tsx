import { Inter } from 'next/font/google';
import c from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

import { SearchForm } from './SearchForm';
import { Logo } from './Logo';
import { cx } from './cx';

export default function Page() {
  return (
    <main className={cx(c.main, c['v-center'], inter.className)}>
      <div className={cx(c.center, c.spacing)}>
        <Logo size="L" />
        <SearchForm />
      </div>
    </main>
  );
}
