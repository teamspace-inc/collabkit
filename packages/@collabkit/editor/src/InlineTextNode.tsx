import type {
  DOMConversionMap,
  DOMConversionOutput,
  LexicalNode,
  SerializedTextNode,
  Spread} from 'lexical';
import {
  TextNode,
} from 'lexical';

export function $createInlineTextNode(text: string) {
  return new InlineTextNode(text);
}

export function $isInlineTextNode(node: LexicalNode | null | undefined): node is InlineTextNode {
  return node instanceof InlineTextNode;
}

export type SerializedInlineTextNode = Spread<
  {
    type: 'inline-text';
    version: 1;
  },
  SerializedTextNode
>;

function convertInlineTextElement(domNode: Node): DOMConversionOutput {
  if (domNode.nodeType !== Node.TEXT_NODE) {
    throw new Error('Expected an element node');
  }
  // todo check if validMention here
  const node = $createInlineTextNode(domNode.textContent ?? '');
  return {
    node,
  };
}

export class InlineTextNode extends TextNode {
  isInline() {
    return true;
  }

  static getType() {
    return 'inline-text';
  }

  exportJSON(): SerializedInlineTextNode {
    return {
      ...super.exportJSON(),
      type: 'inline-text',
      version: 1,
    };
  }

  static clone(node: InlineTextNode): InlineTextNode {
    return new InlineTextNode(node.__text, node.__key);
  }

  static importJSON(serializedNode: SerializedInlineTextNode): InlineTextNode {
    const node = $createInlineTextNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-mention')) {
          return null;
        }
        return {
          conversion: convertInlineTextElement,
          priority: 1,
        };
      },
    };
  }
}
