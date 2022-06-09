import { CollabKit } from '@collabkit/react';
import { useEffect } from 'react';

export function Preview(props: { appId: string; apiKey: string; mode: 'SECURED' | 'UNSECURED' }) {
  useEffect(() => {
    CollabKit.setup(props);
    CollabKit.identify({
      userId: 'user1',
      name: 'Namit',
      email: 'namit@useteamspace.com',
      avatar: 'namit.pic.jpg',
    });
  }, [props.apiKey, props.mode, props.appId]);

  return (
    <div style={{ padding: 20, background: '#eee', borderRadius: '20px' }}>
      <h1>Preview</h1>
      <CollabKit.App token={props.apiKey}>
        <CollabKit.Thread uuid={'foobaz'}></CollabKit.Thread>
      </CollabKit.App>
    </div>
  );
}
