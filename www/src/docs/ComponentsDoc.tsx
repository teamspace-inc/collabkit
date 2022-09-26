import { H2 } from '../UIKit';
import { DocContent, DocTableOfContents } from './Doc';
import { EyeClosed, Envelope, Equals, Eye } from 'phosphor-react';

export function ComponentsDoc() {
  return (
    <div>
      <H2>List of components</H2>
      <DocTableOfContents
        items={[
          {
            name: 'CollabKitProvider',
            icon: EyeClosed,
            href: '/docs/components/collabkitprovider',
          },
          { name: 'Thread', icon: EyeClosed, href: '/docs/components/thread' },
          { name: 'PopoverThread', icon: EyeClosed, href: '/docs/components/popoverthread' },
          { name: 'Inbox', icon: EyeClosed, href: '/docs/components/inbox' },
          // { name: 'Avatar', icon: EyeClosed, href: '/docs/components/avatar' },
          // { name: 'Facepile', icon: EyeClosed, href: '/docs/components/facepile' },
        ]}
      />
    </div>
  );
}
