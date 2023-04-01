import { XmlElement, XmlFragment } from 'yjs';

export function insertDefaultCardContents(fragment: XmlFragment): XmlFragment {
  const heading = new XmlElement('heading');
  heading.setAttribute('level', 1 as any);
  const paragraph = new XmlElement('paragraph');
  fragment.insert(0, [heading, paragraph]);
  return fragment;
}
