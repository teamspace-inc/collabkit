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
import { mentionStyle } from '@collabkit/theme/components/MentionsPlugin.css';

export type SerializedMentionNode = Spread<
  {
    id: string;
    type: 'mention';
    version: 1;
  },
  SerializedTextNode
>;

function convertMentionElement(domNode: Node): DOMConversionOutput {
  if (domNode.nodeType !== Node.ELEMENT_NODE) {
    throw new Error('Expected an element node');
  }
  const id = (domNode as HTMLElement).getAttribute('data-lexical-mention');
  if (id == null) {
    throw new Error('failed to convert mention element');
  }
  // todo check if validMention here
  const node = $createMentionNode(id, domNode.textContent ?? '');
  return {
    node,
  };
}

export class MentionNode extends TextNode {
  __id: string;

  static getType(): string {
    return 'mention';
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__id, node.__text, node.__key);
  }

  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    const node = $createMentionNode(serializedNode.id, serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  constructor(id: string, text?: string, key?: NodeKey) {
    super(text ?? '', key);
    this.__id = id;
  }

  exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      id: this.__id,
      type: 'mention',
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.className = 'mention ' + mentionStyle;
    return dom;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-mention', JSON.stringify(this.__id));
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

export function $createMentionNode(id: string, text: string): MentionNode {
  const mentionNode = new MentionNode(id, text);
  mentionNode.setMode('segmented').toggleDirectionless();
  return mentionNode;
}

export function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode {
  return node instanceof MentionNode;
}
