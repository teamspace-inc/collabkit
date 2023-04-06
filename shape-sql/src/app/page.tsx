import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="/shape.svg"
        alt="Shape Logo"
        className={styles.shapeLogo}
        width={200}
        height={48}
        priority
      />
    </main>
  );
}
