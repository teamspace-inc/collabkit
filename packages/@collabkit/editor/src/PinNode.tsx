import type { DOMConversionOutput, LexicalNode, NodeKey } from 'lexical';
import { DecoratorNode } from 'lexical';
import type { ReactNode } from 'react';
import React from 'react';

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
    // @ts-ignore
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
  return (
    // @ts-ignore
    <svg
      data-pin-id={props.id}
      className="collabkit-composer-pin"
      viewBox="0 0 16 16"
      key="collabkit-composer-pin"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.64639 14.563L11.8552 11.3541C12.8774 10.3319 13.4517 8.94557 13.4517 7.5C13.4517 6.05443 12.8774 4.66806 11.8552 3.64589L11.8552 3.64588C11.3491 3.13976 10.7482 2.73827 10.087 2.46436C9.42566 2.19044 8.7169 2.04946 8.00112 2.04946C7.28535 2.04946 6.57658 2.19044 5.91529 2.46436C5.254 2.73827 4.65314 3.13976 4.14701 3.64589L4.147 3.64589C3.64087 4.15202 3.23939 4.75288 2.96547 5.41417C2.69156 6.07546 2.55058 6.78423 2.55058 7.5C2.55058 8.21577 2.69156 8.92454 2.96547 9.58583C3.23939 10.2471 3.64087 10.848 4.147 11.3541L7.35586 14.563C7.52699 14.7341 7.7591 14.8302 8.00112 14.8302C8.24315 14.8302 8.47525 14.7341 8.64639 14.563Z"
        fill="#222222"
        stroke="#222222"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="7" r="2" fill="white" />
    </svg>
  );
}
