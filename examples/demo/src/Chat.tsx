import { Thread } from '@collabkit/react';

export function Chat() {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 284,
        margin: '0 0 0 0',
        height: 'calc(100vh)',
      }}
    >
      <Thread
        showHeader={true}
        composerPrompt="Add comment..."
        style={{ borderRadius: 0 }}
        threadId="demo-chat3"
      />
    </div>
  );
}
