import {
  $getNodeByKey,
  $getSelection,
  $isTextNode,
  COMMAND_PRIORITY_NORMAL,
  LexicalCommand,
  NodeKey,
} from 'lexical';

import { $getMarkIDs, $wrapSelectionInMarkNode, MarkNode, $isMarkNode } from '@lexical/mark';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isRangeSelection, createCommand } from 'lexical';
import { useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import React from 'react';
import { TextSelectionPopoverPlugin } from './TextSelectionPopoverPlugin';
import { useApp } from '../../hooks/useApp';
import { TextThreadTarget } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { ThreadContextProvider } from '../Thread';
import * as Composer from '../composer/Composer';
import * as Profile from '../Profile';
import { composer, popover } from '../../styles/components/CommentPlugin.css';

export const INSERT_COMMENT_COMMAND: LexicalCommand<void> = createCommand();

// comment mark node
// show popover thread
// concept of a view
// styling for comment popover thread
// notion style interaction

// view
// -- only show inbox items that match the current view
// -- only

// inbox
// -- selected comment, selected comment position to align box to
// --

// resolving a comment, resolves it in the text editor too!
// need a way to remove the associated mark

// import type { NodeKey } from 'lexical';

export class CommentMarkNode extends MarkNode {}

function Toolbar(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: `8px 12px`,
        marginBottom: '4px',
        // background: vars.color.surface,
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      {props.children}
    </div>
  );
}

function CommentPluginComposer(props: { threadId: string }) {
  const { store } = useApp();
  const { userId } = useSnapshot(store);

  return (
    <div className={popover}>
      <ThreadContextProvider threadId={props.threadId}>
        <Composer.Root className={composer}>
          {userId ? (
            <Profile.Provider profileId={userId}>
              <Profile.Avatar />
            </Profile.Provider>
          ) : null}
          <Composer.Editor
            contentEditable={() => <Composer.ContentEditable />}
            placeholder={<Composer.Placeholder>Add comment</Composer.Placeholder>}
          />
        </Composer.Root>
      </ThreadContextProvider>
    </div>
  );
}

function getThreadIdFromMarkId(markId: string) {
  return markId.split('-')[1];
}

export function CommentPlugin(props: { viewId?: string }): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const markNodeMap = useMemo<Map<string, Set<NodeKey>>>(() => {
    return new Map();
  }, []);

  const { store, events } = useApp();

  const { selectedId, workspaceId } = useSnapshot(store);
  const { workspaces } = useSnapshot(store);
  const openThread =
    workspaceId && selectedId?.type === 'thread' && selectedId.workspaceId === workspaceId
      ? workspaces[workspaceId]?.openThreads[selectedId.threadId]
      : null;

  const timeline =
    workspaceId && selectedId?.type === 'thread' && selectedId.workspaceId === workspaceId
      ? workspaces[workspaceId]?.timeline[selectedId.threadId]
      : null;

  console.log(openThread, timeline);

  const hasSelectedComment = !!(
    selectedId !== null &&
    selectedId.type === 'thread' &&
    markNodeMap.get(`collabkit-${selectedId.threadId}`)
  );

  const showPendingThreadComposer = !!(
    selectedId?.type === 'thread' &&
    !openThread &&
    hasSelectedComment
  );

  console.log('showPendingThreadComposer', showPendingThreadComposer);

  const target: TextThreadTarget = {
    type: 'textThread',
    threadId: '123',
    viewId: props.viewId ?? '123',
    workspaceId: '123',
  };

  useEffect(() => {
    const markNodeKeysToIDs: Map<NodeKey, Array<string>> = new Map();

    editor.registerMutationListener(MarkNode, (mutations) => {
      editor.getEditorState().read(() => {
        for (const [key, mutation] of mutations) {
          const node: null | MarkNode = $getNodeByKey(key);
          let ids: NodeKey[] = [];

          if (mutation === 'destroyed') {
            ids = markNodeKeysToIDs.get(key) || [];
          } else if ($isMarkNode(node)) {
            ids = node.getIDs();
          }

          for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            let markNodeKeys = markNodeMap.get(id);
            markNodeKeysToIDs.set(key, ids);

            if (mutation === 'destroyed') {
              if (markNodeKeys !== undefined) {
                markNodeKeys.delete(key);
                if (markNodeKeys.size === 0) {
                  markNodeMap.delete(id);
                  if (workspaceId) {
                    events.onCommentMarkNodeDelete({
                      threadId: getThreadIdFromMarkId(id),
                      workspaceId,
                    });
                  }
                }
              }
            } else {
              if (markNodeKeys === undefined) {
                markNodeKeys = new Set();
                markNodeMap.set(id, markNodeKeys);
              }
              if (!markNodeKeys.has(key)) {
                markNodeKeys.add(key);
                if (workspaceId) {
                  events.onCommentMarkNodeAdd({ workspaceId, threadId: getThreadIdFromMarkId(id) });
                }
              }
            }
          }
        }
      });
    });
  }, [editor, workspaceId]);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return;
        }

        const anchorNode = selection.anchor.getNode();
        if (!$isTextNode(anchorNode)) {
          return;
        }

        const ids = $getMarkIDs(anchorNode, selection.anchor.offset);
        if (workspaceId) {
          events.onCommentMarkNodeSelect({
            workspaceId,
            threadIds: ids?.map((id) => getThreadIdFromMarkId(id)) ?? [],
          });
        }
      });
    });
  }, [editor, workspaceId]);

  useEffect(() => {
    editor.registerCommand(
      INSERT_COMMENT_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const focus = selection.focus;
          const anchor = selection.anchor;
          const isBackward = selection.isBackward();

          // Wrap content in a MarkNode
          $wrapSelectionInMarkNode(selection, isBackward, `collabkit-${nanoid(8)}`);

          // Make selection collapsed at the end
          if (isBackward) {
            focus.set(anchor.key, anchor.offset, anchor.type);
          } else {
            anchor.set(focus.key, focus.offset, focus.type);
          }
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor]);

  console.log({ selectedId, hasSelectedComment, markNodeMap });

  return (
    <>
      <TextSelectionPopoverPlugin>
        <Toolbar>
          {!selectedId && (
            <button onClick={() => editor.dispatchCommand(INSERT_COMMENT_COMMAND, undefined)}>
              Comment
            </button>
          )}
        </Toolbar>
        {showPendingThreadComposer && <CommentPluginComposer threadId={selectedId.threadId} />}
      </TextSelectionPopoverPlugin>
    </>
  );
}
