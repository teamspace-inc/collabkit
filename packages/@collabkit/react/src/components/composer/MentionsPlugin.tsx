import React from 'react';
import type { LexicalEditor, RangeSelection } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
} from 'lexical';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';

import { $createMentionNode, MentionNode } from './MentionNode';
import { snapshot } from 'valtio';
import { Store } from '../../constants';
import { useApp } from '../../hooks/useApp';
import { Avatar } from './../Avatar';
import { styled } from '@stitches/react';
import { mentionsPluginStyles } from '@collabkit/theme';
import { MentionWithColor } from '@collabkit/core';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size,
  useFloating,
} from '@floating-ui/react-dom-interactions';

type MentionMatch = {
  leadOffset: number;
  matchingString: string;
  replaceableString: string;
};

type Resolution = {
  match: MentionMatch;
  range: Range;
};

const StyledMentionsTypeahead = styled('div', mentionsPluginStyles.typeahead);
const StyledMentionsTypeaheadUl = styled('div', mentionsPluginStyles.typeaheadList);
const StyledMentionsTypeaheadLi = styled('div', mentionsPluginStyles.typeaheadListItem);
const StyledMentionsTypeaheadLiName = styled('div', mentionsPluginStyles.typeaheadListItemName);
const StyledMentionsTypeaheadLiEmail = styled('div', mentionsPluginStyles.typeaheadListItemEmail);

const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
const NAME = '\\b[A-Z][^\\s' + PUNCTUATION + ']';

const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION,
};

const CapitalizedNameMentionsRegex = new RegExp(
  '(^|[^#])((?:' + DocumentMentionsRegex.NAME + '{' + 1 + ',})$)'
);

const PUNC = DocumentMentionsRegex.PUNCTUATION;

const TRIGGERS = ['@', '\\uff20'].join('');

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = '[^' + TRIGGERS + PUNC + '\\s]';

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS =
  '(?:' +
  '\\.[ |$]|' + // E.g. "r. " in "Mr. Smith"
  ' |' + // E.g. " " in "Josh Duck"
  '[' +
  PUNC +
  ']|' + // E.g. "-' in "Salier-Hellendag"
  ')';

const LENGTH_LIMIT = 75;

const AtSignMentionsRegex = new RegExp(
  '(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    VALID_JOINS +
    '){0,' +
    LENGTH_LIMIT +
    '})' +
    ')$'
);

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp(
  '(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    '){0,' +
    ALIAS_LENGTH_LIMIT +
    '})' +
    ')$'
);

// At most, 5 suggestions are shown in the popup.
const SUGGESTION_LIST_LENGTH_LIMIT = 5;

const mentionsCache = new Map();

function searchMentionableUsers(
  store: Store,
  string: string,
  callback: (results: MentionWithColor[] | null) => void
) {
  const { mentionableUsers } = snapshot(store);
  const results: MentionWithColor[] = (Object.values(mentionableUsers ?? {}) ?? []).filter(
    (mention) =>
      mention.name && mention.name.toLowerCase().includes(string.toLowerCase()) && mention.email
  );
  if (results == null || results?.length === 0) {
    callback(null);
  } else {
    callback(results);
  }
}

function useMentionLookupService(mentionString: string) {
  const { store } = useApp();
  if (!store) {
    return null;
  }

  const [results, setResults] = useState<Array<MentionWithColor> | null>(null);

  // we probably don't need this caching system
  useEffect(() => {
    const cachedResults = mentionsCache.get(mentionString);

    if (cachedResults === null) {
      return;
    } else if (cachedResults !== undefined) {
      setResults(cachedResults);
      return;
    }

    mentionsCache.set(mentionString, null);
    searchMentionableUsers(store, mentionString, (newResults) => {
      mentionsCache.set(mentionString, newResults);
      setResults(newResults);
    });
  }, [mentionString]);

  return results;
}

function MentionsTypeaheadItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  result,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  result: MentionWithColor;
}) {
  return (
    <StyledMentionsTypeaheadLi
      selected={isSelected}
      key={result.id}
      tabIndex={-1}
      role="option"
      aria-selected={isSelected}
      id={'typeahead-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <Avatar profile={{ ...result, id: result.id }} />
      <div>
        <StyledMentionsTypeaheadLiName>{result.name}</StyledMentionsTypeaheadLiName>
        <StyledMentionsTypeaheadLiEmail>{result.email}</StyledMentionsTypeaheadLiEmail>
      </div>
    </StyledMentionsTypeaheadLi>
  );
}

function MentionsTypeahead({
  close,
  editor,
  resolution,
}: {
  close: () => void;
  editor: LexicalEditor;
  resolution: Resolution;
}) {
  const match = resolution.match;
  const results = useMentionLookupService(match.matchingString);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const { theme } = useApp();

  const { reference, context } = useFloating({
    placement: 'top-start',
    open: (results?.length ?? 0) > 0,
    whileElementsMounted: autoUpdate,
    // onOpenChange: setThreadOpen,
    middleware: [
      offset(4),
      flip(),
      size({
        padding: 12,
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
          // setMaxAvailableSize({ width: availableWidth, height: availableHeight });
        },
      }),
    ],
  });

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (rootElement === null) {
      return;
    }

    reference(rootElement);
  }, [editor]);

  const applyCurrentSelected = useCallback(() => {
    if (results === null || selectedIndex === null) {
      return;
    }
    const selectedEntry = results[selectedIndex];

    close();

    createMentionNodeFromSearchResult(editor, selectedEntry, match);
  }, [close, match, editor, results, selectedIndex]);

  const updateSelectedIndex = useCallback(
    (index: number) => {
      const rootElem = editor.getRootElement();
      if (rootElem !== null) {
        rootElem.setAttribute('aria-activedescendant', 'typeahead-item-' + index);
        setSelectedIndex(index);
      }
    },
    [editor]
  );

  useEffect(() => {
    return () => {
      const rootElem = editor.getRootElement();
      if (rootElem !== null) {
        rootElem.removeAttribute('aria-activedescendant');
      }
    };
  }, [editor]);

  useLayoutEffect(() => {
    if (results === null) {
      setSelectedIndex(null);
    } else if (selectedIndex === null) {
      updateSelectedIndex(0);
    }
  }, [results, selectedIndex, updateSelectedIndex]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_DOWN_COMMAND,
        (payload) => {
          const event = payload;
          if (results !== null && selectedIndex !== null) {
            if (
              selectedIndex < SUGGESTION_LIST_LENGTH_LIMIT - 1 &&
              selectedIndex !== results.length - 1
            ) {
              updateSelectedIndex(selectedIndex + 1);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
          }
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_UP_COMMAND,
        (payload) => {
          const event = payload;
          if (results !== null && selectedIndex !== null) {
            if (selectedIndex !== 0) {
              updateSelectedIndex(selectedIndex - 1);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
          }
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ESCAPE_COMMAND,
        (payload) => {
          const event = payload;
          if (results === null || selectedIndex === null) {
            return false;
          }
          event.preventDefault();
          event.stopImmediatePropagation();
          close();
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_TAB_COMMAND,
        (payload) => {
          const event = payload;
          if (results === null || selectedIndex === null) {
            return false;
          }
          event.preventDefault();
          event.stopImmediatePropagation();
          applyCurrentSelected();
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event: KeyboardEvent | null) => {
          if (results === null || selectedIndex === null) {
            return false;
          }
          if (event !== null) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
          applyCurrentSelected();
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [applyCurrentSelected, close, editor, results, selectedIndex, updateSelectedIndex]);

  if (results === null) {
    return null;
  }

  return (
    <FloatingFocusManager context={context}>
      <StyledMentionsTypeahead
        aria-label="Suggested mentions"
        role="listbox"
        className={theme.className}
        ref={context.floating}
        style={{
          position: context.strategy,
          top: context.y ?? 0,
          left: context.x ?? 0,
        }}
      >
        <StyledMentionsTypeaheadUl>
          {results.slice(0, SUGGESTION_LIST_LENGTH_LIMIT).map((result, i) => (
            <MentionsTypeaheadItem
              key={result.id}
              index={i}
              isSelected={i === selectedIndex}
              onClick={() => {
                setSelectedIndex(i);
                applyCurrentSelected();
              }}
              onMouseEnter={() => {
                setSelectedIndex(i);
              }}
              result={result}
            />
          ))}
        </StyledMentionsTypeaheadUl>
      </StyledMentionsTypeahead>
    </FloatingFocusManager>
  );
}

function checkForCapitalizedNameMentions(
  text: string,
  minMatchLength: number
): MentionMatch | null {
  const match = CapitalizedNameMentionsRegex.exec(text);
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[2];
    if (matchingString != null && matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: matchingString,
      };
    }
  }
  return null;
}

function checkForAtSignMentions(text: string, minMatchLength: number): MentionMatch | null {
  let match = AtSignMentionsRegex.exec(text);

  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[3];
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      };
    }
  }
  return null;
}

function getPossibleMentionMatch(text: string): MentionMatch | null {
  const match = checkForAtSignMentions(text, 1);
  return match === null ? checkForCapitalizedNameMentions(text, 3) : match;
}

function getTextUpToAnchor(selection: RangeSelection): string | null {
  const anchor = selection.anchor;
  if (anchor.type !== 'text') {
    return null;
  }
  const anchorNode = anchor.getNode();
  // We should not be attempting to extract mentions out of nodes
  // that are already being used for other core things. This is
  // especially true for token nodes, which can't be mutated at all.
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}

function tryToPositionRange(match: MentionMatch, range: Range): boolean {
  const domSelection = window.getSelection();
  if (domSelection === null || !domSelection.isCollapsed) {
    return false;
  }
  const anchorNode = domSelection.anchorNode;
  if (anchorNode === null) {
    return false;
  }
  const startOffset = match.leadOffset;
  const endOffset = domSelection.anchorOffset;
  try {
    range.setStart(anchorNode, startOffset);
    range.setEnd(anchorNode, endOffset);
  } catch (error) {
    return false;
  }

  return true;
}

function getMentionsTextToSearch(editor: LexicalEditor): string | null {
  let text = null;
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return;
    }
    text = getTextUpToAnchor(selection);
  });
  return text;
}

/**
 * Walk backwards along user input and forward through entity title to try
 * and replace more of the user's text with entity.
 *
 * E.g. User types "Hello Sarah Smit" and we match "Smit" to "Sarah Smith".
 * Replacing just the match would give us "Hello Sarah Sarah Smith".
 * Instead we find the string "Sarah Smit" and replace all of it.
 */
function getMentionOffset(documentText: string, entryText: string, offset: number): number {
  let triggerOffset = offset;
  for (let ii = triggerOffset; ii <= entryText.length; ii++) {
    if (documentText.substr(-ii) === entryText.substr(0, ii)) {
      triggerOffset = ii;
    }
  }

  return triggerOffset;
}

/**
 * From a Typeahead Search Result, replace plain text from search offset and
 * render a newly created MentionNode.
 */
function createMentionNodeFromSearchResult(
  editor: LexicalEditor,
  mention: MentionWithColor,
  match: MentionMatch
): void {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
      return;
    }
    if (typeof mention.name !== 'string') {
      console.error('CollabKit: Mention name must be a string');
      return;
    }
    const anchor = selection.anchor;
    if (anchor.type !== 'text') {
      return;
    }
    const anchorNode = anchor.getNode();
    // We should not be attempting to extract mentions out of nodes
    // that are already being used for other core things. This is
    // especially true for token nodes, which can't be mutated at all.
    if (!anchorNode.isSimpleText()) {
      return;
    }
    const selectionOffset = anchor.offset;
    const textContent = anchorNode.getTextContent().slice(0, selectionOffset);
    const characterOffset = match.replaceableString.length;

    // Given a known offset for the mention match, look backward in the
    // text to see if there's a longer match to replace.
    const mentionOffset = getMentionOffset(textContent, mention.name, characterOffset);
    const startOffset = selectionOffset - mentionOffset;
    if (startOffset < 0) {
      return;
    }

    let nodeToReplace;
    if (startOffset === 0) {
      [nodeToReplace] = anchorNode.splitText(selectionOffset);
    } else {
      [, nodeToReplace] = anchorNode.splitText(startOffset, selectionOffset);
    }

    const mentionNode = $createMentionNode(mention);
    nodeToReplace.replace(mentionNode);
    mentionNode.select();
  });
}

function isSelectionOnEntityBoundary(editor: LexicalEditor, offset: number): boolean {
  if (offset !== 0) {
    return false;
  }
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();
      const prevSibling = anchorNode.getPreviousSibling();
      return $isTextNode(prevSibling) && prevSibling.isTextEntity();
    }
    return false;
  });
}

function useMentions(editor: LexicalEditor) {
  const [resolution, setResolution] = useState<Resolution | null>(null);

  useEffect(() => {
    if (!editor.hasNodes([MentionNode])) {
      throw new Error('MentionsPlugin: MentionNode not registered on editor');
    }
  }, [editor]);

  useEffect(() => {
    let activeRange: Range | null = document.createRange();
    let previousText: string | null = null;

    const updateListener = () => {
      const range = activeRange;
      const text = getMentionsTextToSearch(editor);

      if (text === previousText || range === null) {
        return;
      }
      previousText = text;

      if (text === null) {
        return;
      }
      const match = getPossibleMentionMatch(text);
      if (match !== null && !isSelectionOnEntityBoundary(editor, match.leadOffset)) {
        const isRangePositioned = tryToPositionRange(match, range);
        if (isRangePositioned !== null) {
          startTransition(() =>
            setResolution({
              match,
              range,
            })
          );
          return;
        }
      }
      startTransition(() => setResolution(null));
    };

    const removeUpdateListener = editor.registerUpdateListener(updateListener);

    return () => {
      activeRange = null;
      removeUpdateListener();
    };
  }, [editor]);

  const closeTypeahead = useCallback(() => {
    setResolution(null);
  }, []);

  return resolution === null || editor === null ? null : (
    <FloatingPortal>
      <MentionsTypeahead close={closeTypeahead} resolution={resolution} editor={editor} />
    </FloatingPortal>
  );
}

export function MentionsPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useMentions(editor);
}
