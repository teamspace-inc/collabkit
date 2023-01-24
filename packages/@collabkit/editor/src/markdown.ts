import {
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  Transformer,
  TextMatchTransformer,
} from '@lexical/markdown';
import { $createMentionNode, MentionNode } from './MentionNode';
import { $createPinNode } from './PinNode';
import { PinNode } from './PinNode';
import { $isPinNode } from './PinNode';
import { $createTimestampNode, $isTimestampNode, TimestampNode } from './TimestampNode';

// Order of text transformers matters:
//
// - code should go first as it prevents any transformations inside
// - then longer tags match (e.g. ** or __ should go before * or _)
const MENTION: TextMatchTransformer = {
  dependencies: [MentionNode],
  export: (node) => {
    if (node.getType() !== 'mention') {
      return null;
    }
    const linkContent = `[${node.getTextContent()}](#@${encodeURIComponent(
      (node as MentionNode).__id
    )})`;
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

const TIMESTAMP: TextMatchTransformer = {
  dependencies: [TimestampNode],
  export: (node) => {
    if (!$isTimestampNode(node)) {
      return null;
    }
    const linkContent = `[${node.getTextContent()}](#T${node.__timestamp})`;
    return linkContent;
  },
  importRegExp: /(?:\[([^[]+)\])(?:\(#T([^(]+)\))/,
  regExp: /(?:\[([^[]+)\])(?:\(#T([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, timestampText] = match;
    const node = $createTimestampNode(timestampText);
    textNode.replace(node);
  },
  trigger: ')',
  type: 'text-match',
};

const PIN: TextMatchTransformer = {
  dependencies: [PinNode],
  export: (node) => {
    if (!$isPinNode(node)) {
      return null;
    }
    const linkContent = `[PIN](#PIN${(node as PinNode).__pinId})`;
    return linkContent;
  },
  importRegExp: /(?:\[([^[]+)\])(?:\(#PIN([^(]+)\))/,
  regExp: /(?:\[([^[]+)\])(?:\(#PIN([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, , pinId] = match;
    const node = $createPinNode(pinId);
    textNode.replace(node);
  },
  trigger: ')',
  type: 'text-match',
};

const TEXT_MATCH_TRANSFORMERS: Array<TextMatchTransformer> = [MENTION, TIMESTAMP, PIN];

export const TRANSFORMERS: Array<Transformer> = [
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS,
];
