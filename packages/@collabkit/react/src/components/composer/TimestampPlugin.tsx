import React, { useCallback } from 'react';
import { TextNode } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $createTimestampNode, TimestampNode } from './TimestampNode';

const REGEX = /(([0-5]{1}[0-9]{1}:)?[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}) /i;

export default function TimestampPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([TimestampNode])) {
      throw new Error('TimestampPlugin: TimestampNode not registered on editor');
    }
  }, [editor]);
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, (node) => {
      const match = getTimestampMatch(node.getTextContent());
      if (match) {
        const timestamp = $createTimestampNode(match.text);
        let nodeToReplace;

        if (match.start === 0) {
          [nodeToReplace, node] = node.splitText(match.end);
        } else {
          [, nodeToReplace, node] = node.splitText(match.start, match.end);
        }

        nodeToReplace.replace(timestamp);
      }
    });

    return () => {
      removeTransform();
    };
  }, [editor]);

  const getTimestampMatch = useCallback((text: string) => {
    const match = REGEX.exec(text);

    if (match === null) {
      return null;
    }

    const timestampLength = match[0].length - 1;
    const start = match.index;
    const end = start + timestampLength;
    return {
      text: match[0].slice(0, -1),
      end,
      start,
    };
  }, []);

  return null;
}
