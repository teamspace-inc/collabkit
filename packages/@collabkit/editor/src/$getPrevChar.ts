import { $createRangeSelection, $getSelection, $isRangeSelection } from 'lexical';

export function $getPrevChar() {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    // we want to see if the previous character is an @
    // and if so toggle the mentions picker open
    // if not we want to add an @ which triggers
    // the mentions plugin to open it for us
    const prevCharSelection = $createRangeSelection();
    prevCharSelection.anchor.offset =
      selection.anchor.offset - 1 < 0 ? 0 : selection.anchor.offset - 1;
    prevCharSelection.focus.offset = selection.anchor.offset;
    const prevChar = prevCharSelection.getTextContent();
    return prevChar;
  } else {
    return null;
  }
}
