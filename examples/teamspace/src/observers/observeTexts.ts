import { ShapeTarget } from 'state/constants';
import { Map, XmlFragment, YMapEvent } from 'yjs';

// this is sticky note text, not card text!
export function observeTexts(
  texts: Map<XmlFragment>,
  onTextChange: (target: ShapeTarget, text: XmlFragment) => void,
  onTextAdded: (target: ShapeTarget, text: XmlFragment) => void
) {
  const callbacks = new globalThis.Map<XmlFragment, () => void>();
  const ids = new Set<string>();
  let seenTexts = new Set<string>();

  function observeText(target: ShapeTarget, text: XmlFragment) {
    const callback = () => onTextChange(target, text);

    callbacks.set(text, callback);

    text.observeDeep(callback);

    // if this is the first time we are seeing this
    // id then we don't need to wait for a second
    // change in order to index it.
    if (!ids.has(target.id)) callback();

    ids.add(target.id);
  }

  function onTextsChange(event: YMapEvent<XmlFragment>) {
    for (const [_, id] of event.keysChanged.entries() as unknown as [unknown, string][]) {
      const newText = !seenTexts.has(id);
      seenTexts.add(id);
      const text = texts.get(id);
      const target: ShapeTarget = { type: 'shape', id };
      if (text) {
        if (newText) {
          onTextAdded(target, text);
        }
        observeText(target, text);
      }
    }
  }

  texts.observe(onTextsChange);

  for (const [id, text] of texts.entries() as unknown as [string, XmlFragment][]) {
    observeText({ type: 'shape', id }, text);
  }

  return () => {
    for (const [text, callback] of callbacks.entries()) {
      text.unobserveDeep(callback);
    }
    texts.unobserve(onTextsChange);
  };
}
