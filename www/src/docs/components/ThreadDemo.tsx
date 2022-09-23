import { Thread } from '@collabkit/react';
import { DemoContainer } from '../../UIKit';

export function ThreadDemo() {
  return (
    <DemoContainer>
      <div
        style={{
          height: '480px',
          width: '320px',
        }}
      >
        <Thread threadId={'test'} style={{ width: 320 }} />
      </div>
    </DemoContainer>
  );
}
