import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

// import { FeedbackButtons } from './FeedbackButtons';
import { Result } from './Result';
import { SearchForm } from './SearchForm';
import { Logo } from './Logo';
import { Card } from './Card';
// import { H3 } from './H3';
// import { Divider } from './Divider';
import { Thinking, Thought } from './Thinking';

export default function Home() {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.container}>
        <div className={`${styles.center} ${styles.spacing}`}>
          <Logo size="M" />
          <SearchForm />
          <Card>
            {/* <H3>Thinking</H3>
            <Divider /> */}
            <Thinking />
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
