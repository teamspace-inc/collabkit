import { H2 } from '../UIKit';
import { SidebarSimple, Rows, Table } from 'phosphor-react';
import { DocTableOfContents } from './Doc';

const items = [
  { name: 'Detail Views', icon: SidebarSimple, href: '' },
  { name: 'List Views', icon: Rows, href: '' },
  { name: 'Table Views', icon: Table, href: '' },
];

// this is just a placeholder
// needs design
export function PatternsDoc() {
  return (
    <div>
      <H2>Get design guidance for common ways to enable commenting.</H2>
      <DocTableOfContents items={items} />
    </div>
  );
}
