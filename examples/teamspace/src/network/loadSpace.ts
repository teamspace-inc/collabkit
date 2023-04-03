import { Doc } from 'yjs';
import { MultiDocUndoManager } from 'y-utility/y-multidoc-undomanager';
import { ref } from 'valtio';
import {
  ITEMS_V2_KEY,
  LINKS_KEY,
  SPACE_NAME_KEY,
  StateWithSpace,
  TEXTS_KEY,
} from 'state/constants';
import { defaultDeleteFilter, defaultProtectedNodes } from 'editor';
import { ySyncPluginKey } from 'y-prosemirror';
import { getLinkedDocSave } from './saveUtils';
import actions from 'state/actions';
import { observeTexts, observeSpaceName } from '../observers';
import { bindDoc, fetchLastSave } from './bindDoc';
import { loadCard } from './loadCard';
import { VERSION } from './schema';
import { getAppEvents } from '../events';
import { bindProxyAndYKeyValue } from './bindProxyAndYKeyValue';

export async function loadSpace(
  doc: Doc,
  state: StateWithSpace,
  transactionOrigin: () => { clientId: string; txId: number } | { clientId: string; txId?: number }
) {
  state.currentSpace.docIsLoading = true;
  state.store.lastOpenedSpaceId = doc.guid;

  const subs: (() => void)[] = [];
  const save = await fetchLastSave(doc.guid);

  const binding = bindDoc(doc, 'space', state, VERSION, { save });
  state.currentSpace.binding = binding;

  await binding.load();

  const undoManager = new MultiDocUndoManager(
    [
      doc.getMap(TEXTS_KEY),
      doc.getArray(ITEMS_V2_KEY),
      doc.getArray(LINKS_KEY),
      doc.getXmlFragment(SPACE_NAME_KEY),
    ],
    {
      trackedOrigins: new Set([transactionOrigin, ySyncPluginKey, 'undo']),
      captureTimeout: 250,
      // @ts-expect-error As of y-utility@0.1.1, the following options are missing from the type.
      // Fixed in https://github.com/yjs/y-utility/pull/2
      deleteFilter: (item: any) => defaultDeleteFilter(item, defaultProtectedNodes),
      ignoreRemoteMapChanges: true,
    }
  );
  state.currentSpace.undoManager = ref(undoManager);

  const version = doc.getMap('meta').get('version') as number | undefined;

  if (version && version >= 2) {
    const result = bindProxyAndYKeyValue(
      state.currentSpace.items,
      doc.getArray(ITEMS_V2_KEY),
      transactionOrigin,
      {
        onAdded: (itemId) => {
          const item = state.currentSpace.items[itemId];

          // we presume this is an itemId, but equally
          // it could be the key for any nested object
          if (!item) {
            return;
          }

          // only need to subscribe for updates for card like things
          if (item.type === 'card' || item.type === 'table') {
            let card = state.store.cards[item.docId];

            // @todo check if we've already loaded this doc before
            if (!card || !card.binding) {
              const linkedSave = save && getLinkedDocSave(save, item.docId);
              card = loadCard(state, item.docId, { save: linkedSave });
            }
          }
        },
        onProxyChanged: () => undoManager.stopCapturing(),
      }
    );
    subs.push(result.unsubscribe);
  } else {
    throw new Error(`Unsupported space version ${version}`);
  }

  for (const item of Object.values(state.currentSpace.items)) {
    if ((item.type === 'card' || item.type === 'table') && !item.isDeleted) {
      let card = state.store.cards[item.docId];
      if (!card || !card.binding) {
        const linkedSave = save && getLinkedDocSave(save, item.docId);
        card = loadCard(state, item.docId, { save: linkedSave });
      }
    }
  }

  state.currentSpace.docIsLoading = false;

  actions.restoreCamera(state.currentSpace);
  actions.saveSpace(state.store, state.currentSpace);

  subs.push(observeSpaceName(doc.getXmlFragment(SPACE_NAME_KEY), state.store, state.currentSpace));

  const { onTextChange, onTextAdded } = getAppEvents(state.store, state.currentSpace);

  subs.push(observeTexts(doc.getMap(TEXTS_KEY), onTextChange, onTextAdded));

  binding.subscribe();

  doc.on('destroy', () => {
    subs.forEach((unsub) => unsub());
    binding.unsubscribe();
  });

  return doc;
}
