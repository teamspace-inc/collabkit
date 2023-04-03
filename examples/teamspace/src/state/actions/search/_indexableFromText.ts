import { TextCardTarget } from 'state/constants';
import { IndexItem } from 'types';
import { XmlFragment } from 'yjs';

// traverse nodes and find links to
// other cards
function findCardLinks(rootNode: Node) {
  let links: string[] = [];
  for (const node of rootNode.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'LINK') {
      const cardId = (node as Element).getAttribute('data-card-id');
      if (cardId) links.push(cardId);
    }
    links = [...links, ...findCardLinks(node)];
  }
  return links;
}

function concatTextContent(rootNode: Node) {
  let text = '';

  for (const node of rootNode.childNodes) {
    if (node.hasChildNodes()) {
      text += concatTextContent(node);
    } else {
      text += ' ' + node.textContent;
    }
  }

  return text;
}

export function createIndexItem(target: TextCardTarget, text: XmlFragment) {
  let indexableText: IndexItem = { target };

  // we need to wrap the text in a div to make it parseable
  // as prosemirror returns multiple nodes as siblings as root
  // instead of one root node
  const prosemirrorXML = text.toJSON();
  const xml = `<div>${prosemirrorXML}</div>`;
  const nodes = new DOMParser().parseFromString(xml, 'text/html');

  // unwrap *html* > [head, *body*] > *div*
  const rootNode = nodes.firstChild?.lastChild?.firstChild!;

  const { firstChild } = rootNode;

  indexableText.links = findCardLinks(rootNode);

  // it has a title, this is nice as h1, h2, h3 are all headings
  if (firstChild?.nodeName === 'HEADING' && firstChild.textContent) {
    indexableText.title = firstChild.textContent;
  } else {
    indexableText.title = '';
  }

  // set all text to the indexable content
  // this indexes the heading twice (if present)
  if (rootNode.textContent) {
    indexableText.text = concatTextContent(rootNode).trim();

    if (indexableText.title.length > 0) {
      indexableText.text = indexableText.text.slice(indexableText.title.length + 1);
    }
  } else {
    indexableText.text = '';
  }

  return indexableText;
}
