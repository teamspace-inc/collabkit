import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

import { SearchForm } from './SearchForm';
import { Logo } from './Logo';
import { Card } from './Card';
import { Thinking } from './Thinking';

export default function Home() {
  return (
    <div className={styles.center} style={{ marginLeft: -100 }}>
      <main className={`${styles.main} ${inter.className}`}>
        <nav className={styles.nav}>
          <Logo size="M" />
          <div
            style={{
              width: 720,
              display: 'table',
              margin: '0 auto',
              left: -110,
              position: 'relative',
            }}
          >
            <SearchForm />
          </div>
        </nav>
        <div className={styles.container}>
          <div className={`${styles.center} ${styles.spacing}`}>
            <Card>
              {/* <H3>Thinking</H3>
            <Divider /> */}
              <Thinking />
              {/* <Divider /> */}
              {/* <Table /> */}
              {/* <Divider /> */}
            </Card>
            {/* <Divider />
          <H3>RELATED</H3>
          <Related />
          <H3>FOLLOW UP</H3>
          <SearchInput /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
