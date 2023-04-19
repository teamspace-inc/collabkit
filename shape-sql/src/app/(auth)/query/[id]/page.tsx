import { Answer } from '@/app/Answer';
import { Card } from '@/app/Card';
import styles from './page.module.css';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.center}>
      <Card>
        <Answer queryId={params.id} />
      </Card>
    </div>
  );
}
