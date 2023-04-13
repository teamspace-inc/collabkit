import styles from '../../../page.module.css';

export const metadata = {
  title: 'Shape',
  description: 'Get answers from an AI data scientist',
};

export default function QueryLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.main}>{children}</div>;
}
