import { DOMConversionOutput, LexicalNode, NodeKey, DecoratorNode } from 'lexical';
import React, { ReactNode } from 'react';

export type SerializedPinNode = {
  pinId: string;
  type: 'pin';
  version: 1;
};

function convertPinElement(domNode: Node): DOMConversionOutput {
  const node = $createPinNode(domNode.textContent ?? '');
  return {
    node,
  };
}

export class PinNode extends DecoratorNode<ReactNode> {
  __id: string;

  static getType(): string {
    return 'pin';
  }

  static clone(node: PinNode): PinNode {
    return new PinNode(node.__id, node.__key);
  }

  constructor(id: string, key?: NodeKey) {
    super(key);
    this.__id = id;
  }

  getTextContent(): string {
    return ' ';
  }

  exportJSON(): SerializedPinNode {
    return {
      ...super.exportJSON(),
      pinId: this.__id,
      type: 'pin',
      version: 1,
    };
  }

  static importJSON(serializedNode: SerializedPinNode): PinNode {
    return $createPinNode(serializedNode.pinId);
  }

  isInline() {
    return true;
  }

  createDOM(): HTMLElement {
    return document.createElement('span');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return <ComposerPin id={this.__id} />;
  }
}

export function $createPinNode(id: string): PinNode {
  return new PinNode(id);
}

export function $isPinNode(node: LexicalNode | undefined): boolean {
  return node instanceof PinNode;
}

export function ComposerPin(props: { id: string }) {
  return null;
}
