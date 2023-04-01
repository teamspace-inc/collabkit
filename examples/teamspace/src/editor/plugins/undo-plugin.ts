import { Plugin, PluginKey } from 'prosemirror-state';
import { getRelativeSelection, ySyncPluginKey } from 'y-prosemirror';
import { UndoManager, Item, ContentType, XmlElement, Text, RelativePosition } from 'yjs';
import type { MultiDocUndoManager } from 'y-utility/y-multidoc-undomanager';

const yUndoPluginKey = new PluginKey<YUndoPluginState>('teamspace/undo-plugin');

type YUndoPluginState = {
  undoManager: UndoManager | MultiDocUndoManager;
  prevSel: { anchor: RelativePosition; head: RelativePosition } | null;
  hasUndoOps: boolean;
  hasRedoOps: boolean;
};

export const defaultProtectedNodes = new Set(['paragraph']);

export const defaultDeleteFilter = (item: unknown, protectedNodes: Set<string>) =>
  !(item instanceof Item) ||
  !(item.content instanceof ContentType) ||
  !(
    item.content.type instanceof Text ||
    (item.content.type instanceof XmlElement && protectedNodes.has(item.content.type.nodeName))
  ) ||
  item.content.type._length === 0;

export const yUndoPlugin = ({
  undoManager,
}: {
  undoManager: UndoManager | MultiDocUndoManager;
}) => {
  return new Plugin<YUndoPluginState>({
    key: yUndoPluginKey,
    state: {
      init: () => {
        // TODO: check if plugin order matches and fix

        return {
          undoManager,
          prevSel: null,
          hasUndoOps: undoManager.undoStack.length > 0,
          hasRedoOps: undoManager.redoStack.length > 0,
        };
      },
      apply: (tr, val, oldState, state) => {
        const binding = ySyncPluginKey.getState(state).binding;
        const undoManager = val.undoManager;
        const hasUndoOps = undoManager.undoStack.length > 0;
        const hasRedoOps = undoManager.redoStack.length > 0;
        if (binding) {
          return {
            undoManager,
            prevSel: getRelativeSelection(binding, oldState),
            hasUndoOps,
            hasRedoOps,
          };
        } else {
          if (hasUndoOps !== val.hasUndoOps || hasRedoOps !== val.hasRedoOps) {
            return Object.assign({}, val, {
              hasUndoOps: undoManager.undoStack.length > 0,
              hasRedoOps: undoManager.redoStack.length > 0,
            });
          } else {
            // nothing changed
            return val;
          }
        }
      },
    },
    view: (view) => {
      const ystate = ySyncPluginKey.getState(view.state);
      const undoManager = yUndoPluginKey.getState(view.state)?.undoManager;
      if (!undoManager) {
        throw new Error('[yUndoPlugin.view] missing undoManager');
      }
      const onStackItemAdded = ({ stackItem }: { stackItem: any }) => {
        const binding = ystate.binding;
        if (binding) {
          stackItem.meta.set(binding, yUndoPluginKey.getState(view.state)?.prevSel);
        }
      };
      const onStackItemPopped = ({ stackItem }: { stackItem: any }) => {
        const binding = ystate.binding;
        if (binding) {
          binding.beforeTransactionSelection =
            stackItem.meta.get(binding) || binding.beforeTransactionSelection;
        }
      };
      undoManager.on('stack-item-added', onStackItemAdded);
      undoManager.on('stack-item-popped', onStackItemPopped);

      return {
        destroy: () => {
          undoManager.off('stack-item-added', onStackItemAdded);
          undoManager.off('stack-item-popped', onStackItemPopped);
        },
      };
    },
  });
};
