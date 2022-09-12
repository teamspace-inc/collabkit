import {
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  Transformer,
  TextMatchTransformer,
} from '@lexical/markdown';
import { $createMentionNode, $isMentionNode, MentionNode } from './MentionNode';

// Order of text transformers matters:
//
// - code should go first as it prevents any transformations inside
// - then longer tags match (e.g. ** or __ should go before * or _)
const MENTION: TextMatchTransformer = {
  dependencies: [MentionNode],
  export: (node) => {
    if (!$isMentionNode(node)) {
      return null;
    }
    const linkContent = `[${node.getTextContent()}](#@${node.__id})`;
    return linkContent;
  },
  importRegExp: /(?:\[([^[]+)\])(?:\(#@([^(]+)\))/,
  regExp: /(?:\[([^[]+)\])(?:\(#@([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, name, id] = match;
    const mentionNode = $createMentionNode(id, name);
    textNode.replace(mentionNode);
  },
  trigger: ')',
  type: 'text-match',
};

const TEXT_MATCH_TRANSFORMERS: Array<TextMatchTransformer> = [MENTION];

export const TRANSFORMERS: Array<Transformer> = [
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS,
];
