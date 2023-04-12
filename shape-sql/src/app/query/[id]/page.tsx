import { Answer } from '@/app/Answer';
import { Card } from '@/app/Card';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <Card>
        <Answer queryId={params.id} />
      </Card>
    </div>
  );
}
