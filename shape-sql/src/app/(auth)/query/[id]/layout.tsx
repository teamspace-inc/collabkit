import { SearchForm } from '@/app/SearchForm';
import styles from './layout.module.css';

export const metadata = {
  title: 'Shape',
  description: 'Get answers from an AI data scientist',
};

export default function QueryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main}>
      <>{children}</>
      <div className={styles.footer}>
        <div className={styles.form}>
          <SearchForm placeholder={'Ask another question or a follow-up'} />
        </div>
      </div>
    </div>
  );
}
