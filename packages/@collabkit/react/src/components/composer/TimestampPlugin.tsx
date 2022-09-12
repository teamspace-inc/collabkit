import { useCallback } from 'react';
import { TextNode } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $createTimestampNode, TimestampNode } from '../../editor';

const REGEX = /(([0-5]{0,1}[0-9]{1}:)?[0-5]{0,1}[0-9]{1}:[0-5]{1}[0-9]{1})\b/i;

export function TimestampPlugin() {
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

    const hasTrailingSpace = match[0].slice(-1) === ' ';

    const timestampLength = match[0].length - (hasTrailingSpace ? 1 : 0);
    const start = match.index;
    const end = start + timestampLength;
    return {
      text: hasTrailingSpace ? match[0].slice(0, -1) : match[0],
      end,
      start,
    };
  }, []);

  return null;
}
