import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, PASTE_COMMAND } from 'lexical';

import { $insertDataTransferForPlainText } from '@lexical/clipboard';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function PasteTextPlugin() {
  const [editor] = useLexicalComposerContext();
  editor.registerCommand<ClipboardEvent>(
    PASTE_COMMAND,
    (event) => {
      if (event.clipboardData !== null) {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $insertDataTransferForPlainText(event.clipboardData, selection);
        }
      }
      return true;
    },
    COMMAND_PRIORITY_EDITOR
  );
  return null;
}
