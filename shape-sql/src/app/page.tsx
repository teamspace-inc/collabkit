import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

// import { FeedbackButtons } from './FeedbackButtons';
import { Result } from './Result';
import { SearchForm } from './SearchForm';
import { Logo } from './Logo';
import { Card } from './Card';

export default function Home() {
  return (
    <main className={`${styles.main} ${styles.center} ${inter.className}`}>
      <div className={styles.container}>
        <div className={`${styles.center} ${styles.spacing}`}>
          <Logo size="L" />
          <SearchForm />
          <Card>
            <Result />
            {/* <Divider /> */}
            {/* <Table /> */}
            {/* <Divider /> */}
          </Card>
          {/* <FeedbackButtons /> */}
          {/* <Divider />
          <H3>RELATED</H3>
          <Related />
          <H3>FOLLOW UP</H3>
          <SearchInput /> */}
        </div>
      </div>
    </main>
  );
}
