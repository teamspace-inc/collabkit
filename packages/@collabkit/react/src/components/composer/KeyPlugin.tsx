import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_LOW, KEY_ENTER_COMMAND, KEY_ESCAPE_COMMAND } from 'lexical';
import { mergeRegister } from '@lexical/utils';

export function KeyPlugin(props: { onKeyDown: (event: KeyboardEvent) => void }) {
  const [editor] = useLexicalComposerContext();

  mergeRegister(
    editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event == null) {
          return false;
        }
        props.onKeyDown(event);
        return true;
      },
      COMMAND_PRIORITY_LOW
    ),
    editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      (event) => {
        if (event == null) {
          return false;
        }
        props.onKeyDown(event);
        return true;
      },
      COMMAND_PRIORITY_LOW
    )
  );
  return null;
}
