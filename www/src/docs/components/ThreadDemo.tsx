import { Thread } from '@collabkit/react';
import { DocDemoContainer } from '../Doc';

export function ThreadDemo() {
  return (
    <DocDemoContainer>
      <div
        style={{
          height: '360px',
          width: '280px',
        }}
      >
        <Thread threadId={'test'} style={{ width: 320 }} />
      </div>
    </DocDemoContainer>
  );
}
