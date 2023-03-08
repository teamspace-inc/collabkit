import type {
  Spread,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
} from 'lexical';
import { TextNode } from 'lexical';

export type SerializedTimestampNode = Spread<
  {
    timestamp: string;
    type: 'timestamp';
    version: 1;
  },
  SerializedTextNode
>;

function convertTimestampElement(domNode: Node): DOMConversionOutput {
  const node = $createTimestampNode(domNode.textContent ?? '');
  return {
    node,
  };
}

const timestampStyle = `font-weight: 700`;
export class TimestampNode extends TextNode {
  __timestamp: string;

  static getType(): string {
    return 'timestamp';
  }

  static clone(node: TimestampNode): TimestampNode {
    return new TimestampNode(node.__timestamp, node.__text, node.__key);
  }
  static importJSON(serializedNode: SerializedTimestampNode): TimestampNode {
    const node = $createTimestampNode(serializedNode.timestamp);
    node.setTextContent(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  constructor(timestamp: string, text?: string, key?: NodeKey) {
    super(text ?? timestamp, key);
    this.__timestamp = timestamp;
  }

  exportJSON(): SerializedTimestampNode {
    return {
      ...super.exportJSON(),
      timestamp: this.__timestamp,
      type: 'timestamp',
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.style.cssText = timestampStyle;
    dom.className = 'timestamp';
    return dom;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-timestamp', 'true');
    element.textContent = this.__text;
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      // @ts-ignore
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-timestamp')) {
          return null;
        }
        return {
          conversion: convertTimestampElement,
          priority: 1,
        };
      },
    };
  }

  isTextEntity(): true {
    return true;
  }
}

export function $createTimestampNode(timestampText: string): TimestampNode {
  const timestampNode = new TimestampNode(timestampText);
  timestampNode.setMode('token').toggleDirectionless();
  return timestampNode;
}

export function $isTimestampNode(node: LexicalNode | null | undefined): node is TimestampNode {
  return node instanceof TimestampNode;
}
