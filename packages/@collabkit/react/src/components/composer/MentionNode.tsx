import { MentionWithColor } from '@collabkit/core';
import type { Spread } from 'lexical';
import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  TextNode,
} from 'lexical';

export type SerializedMentionNode = Spread<
  {
    mention: MentionWithColor;
    type: 'mention';
    version: 1;
  },
  SerializedTextNode
>;

function convertMentionElement(domNode: Node): DOMConversionOutput {
  if (domNode.nodeType !== Node.ELEMENT_NODE) {
    throw new Error('Expected an element node');
  }
  const mention = JSON.parse((domNode as HTMLElement).getAttribute('data-lexical-mention') ?? '{}');
  // todo check if validMention here
  const node = $createMentionNode(mention);
  return {
    node,
  };
}

// find a way to hook this up to the Stitches theme
const mentionStyle = `font-weight: 700`;
export class MentionNode extends TextNode {
  __mention: MentionWithColor;

  static getType(): string {
    return 'mention';
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }
  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    const node = $createMentionNode(serializedNode.mention);
    node.setTextContent(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  constructor(mention: MentionWithColor, text?: string, key?: NodeKey) {
    super(text ?? mention?.name ?? '', key);
    this.__mention = mention;
  }

  exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      mention: this.__mention,
      type: 'mention',
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.style.cssText = mentionStyle;
    dom.className = 'mention';
    return dom;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-mention', JSON.stringify(this.__mention));
    element.textContent = this.__text;
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      // @ts-ignore
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-mention')) {
          return null;
        }
        return {
          conversion: convertMentionElement,
          priority: 1,
        };
      },
    };
  }

  isTextEntity(): true {
    return true;
  }
}

export function $createMentionNode(mention: MentionWithColor): MentionNode {
  const mentionNode = new MentionNode(mention);
  mentionNode.setMode('segmented').toggleDirectionless();
  return mentionNode;
}

export function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode {
  return node instanceof MentionNode;
}
