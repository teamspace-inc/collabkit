import { H2 } from '../UIKit';
import { SidebarSimple, Rows, Table } from 'phosphor-react';
import { DocTableOfContents } from './Doc';

const items = [
  { name: 'Detail Views', icon: SidebarSimple, href: '/docs/patterns/detailviews' },
  { name: 'List Views', icon: Rows, href: '/docs/patterns/listviews' },
  { name: 'Table Views', icon: Table, href: '/docs/patterns/tableviews' },
];

export function PatternsDoc() {
  return (
    <div>
      <H2>Get design guidance for common ways to enable commenting.</H2>
      <DocTableOfContents items={items} />
    </div>
  );
}
