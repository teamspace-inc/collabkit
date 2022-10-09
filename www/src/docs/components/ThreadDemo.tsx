import { Thread } from '@collabkit/react';
import { DocDemoContainer } from '../Doc';

export function ThreadDemo() {
  return (
    <DocDemoContainer>
      <div
        style={{
          height: '320px',
          width: '280px',
        }}
      >
        <Thread threadId={'test'} style={{ width: 320 }} autoFocus={false} />
      </div>
    </DocDemoContainer>
  );
}
