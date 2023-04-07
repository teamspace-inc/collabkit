'use client';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

// import { FeedbackButtons } from './FeedbackButtons';
import { proxy } from 'valtio';
import { Result } from './Result';
import { SearchForm } from './SearchForm';

type Store = {
  query: string;
  response: { data: string } | null;
};

export const store = proxy<Store>({
  query: '',
  response: null,
});

const LOGO_SIZES = {
  M: {
    width: 100,
    height: 24,
  },
  L: {
    width: 200,
    height: 48,
  },
} as const;

function Logo(props: { size: 'M' | 'L' }) {
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

function Card(props: { children: React.ReactNode }) {
  return <div className={styles.card}>{props.children}</div>;
}

function PillButton(props: { children: React.ReactNode }) {
  return <button className={styles.pillButton}>{props.children}</button>;
}

function H3(props: { children: React.ReactNode }) {
  return <h3 className={styles.h3}>{props.children}</h3>;
}

function Table() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Shape</th>
          <th>Postgres</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

function Divider() {
  return <div className={styles.divider} />;
}

function Related() {
  return (
    <div className={styles.related}>
      <PillButton>How many new users joined this month?</PillButton>
      <PillButton>What are the total new users this year?</PillButton>
      <PillButton>How many new users did we get through Google searches?</PillButton>
    </div>
  );
}

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
