import { H2 } from '../UIKit';

import { Chat, List } from 'phosphor-react';
import { DocTableOfContents } from './Doc';

export function HooksDoc() {
  return (
    <div>
      <H2>Use hooks to access unread comment counts.</H2>
      <DocTableOfContents
        items={[
          {
            name: 'useUnreadCommentsCount',
            icon: Chat,
            href: '/docs/hooks/useUnreadCommentsCount',
          },
          { name: 'useUnreadThreadsCount', icon: List, href: '/docs/hooks/useUnreadCommentsCount' },
        ]}
      />
    </div>
  );
}
