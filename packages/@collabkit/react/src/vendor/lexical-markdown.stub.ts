import type { LexicalNode } from 'lexical';

export function $createCodeNode(language?: string | null | undefined): never {
  throw new Error('$createCodeNode is not implemented (stub)');
}

export function $isCodeNode(node: LexicalNode | null | undefined): false {
  return false;
}

export { ElementNode as CodeNode } from 'lexical';
