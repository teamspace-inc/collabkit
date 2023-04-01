import { YTextEditor } from 'editor';
import { useCallback } from 'react';
import { useRealtime } from '../../hooks/useRealtime';
import { inputs } from '@tldraw/core';
import { useAppEvents } from '../../events';
import { EditorView } from 'prosemirror-view';
import { useTextFragment } from '../../hooks/useTextFragment';
import { css } from '@stitches/react';

import {
  editorPlaceholder,
  baseTextStyles,
  editorHeadingStyles,
  editorListStyles,
  editorPStyles,
  editorLinkStyles,
} from 'styles/editorStyles';
import { cardCss, cardInner } from 'styles/cardStyles';
import { REFERENCES_ENABLED, TextCardTarget } from 'state/constants';
import { UndoManager } from 'yjs';
import { MultiDocUndoManager } from 'y-utility/y-multidoc-undomanager';
import { sand } from '@radix-ui/colors';
import { useSnapshot } from 'valtio';
import { useAppContext } from 'hooks/useAppContext';
import styled from 'styles/stitches.config';
import { ArrowDownLeft } from 'phosphor-react';
import { useEditorContext } from 'hooks/useEditorContext';

export const editorCss = css(
  cardInner,
  baseTextStyles,
  editorPStyles,
  editorHeadingStyles,
  editorListStyles,
  editorLinkStyles
);

type TextCardProps = {
  target: TextCardTarget;
  isRounded: boolean;
  isEditing: boolean;
  isDragging: boolean;
  fullHeight: boolean;
  editable: boolean;
  isSmall: boolean;
  undoManager?: UndoManager | MultiDocUndoManager;
  className?: string;
};

const StyledLink = styled('li', {
  // padding: '$space$0 $space$2',
  // background: '$colors$linkBackground',
  color: '$colors$linkText',
  // borderRadius: '$radii$1',
});

function Link(props: { text: string; cardId: string }) {
  return <StyledLink>{props.text}</StyledLink>;
}

// const StyledLinkList = styled('ol', {
//   // display: 'flex',
//   // flexDirection: 'row',
//   // gap: '$space$1',
//   margin: 0,
//   marginTop: '5.5px !important',
//   maxWidth: 22 * 7 * 3.5,
//   overflow: 'auto',
// });

export function TextCard({
  target,
  isRounded,
  isEditing,
  isDragging,
  editable,
  isSmall,
  fullHeight,
  undoManager,
  className,
}: TextCardProps) {
  const { id } = target; // this is also a docId!

  if (target.type !== 'card') {
    throw new Error('TextCard can only be used with a card target');
  }

  const fragment = useTextFragment(target);
  const realtime = useRealtime(id);

  // const editorStyles = editorCss({ isRounded, isEditing, isSmall, isDragging });
  const cardStyles = cardCss({ isRounded, isEditing, isSmall, isDragging, fullHeight });

  const editorContext = useEditorContext();

  const {
    onEditorViewInstantiated: _onEditorViewInstantiated,
    onEditorViewDestroyed: _onEditorViewDestroyed,
    onEditorUpdate: _onUpdate,
    onKeyDown: _onKeyDown,
  } = useAppEvents();

  // nc: we can probably collapse TL events and app
  // events down to just one system. will be easier
  // as there are more 'app' events than 'tl' events
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();
      const info = inputs.keydown(e);
      _onKeyDown?.(e.key, info, e, editorContext);
      return true;
    },
    [inputs, _onKeyDown, id]
  );

  const onEditorViewInstantiated = useCallback(
    (view: EditorView) => {
      _onEditorViewInstantiated(editorContext, target, view);
    },
    [target.id, target.type]
  );

  const onEditorViewDestroyed = useCallback(() => {
    _onEditorViewDestroyed(editorContext, target);
  }, [target.id, target.type]);

  const onUpdate = useCallback(
    (view: EditorView, isLocalClient: boolean) => {
      _onUpdate(editorContext, target, view, isLocalClient);
    },
    [target.id, target.type]
  );

  const data = useSnapshot(useAppContext().store);
  const { backlinks } = data.cards[target.id].props;
  const references = Object.keys(backlinks)
    .map((_linkId) => {
      const title = data.search.indexedItems[_linkId]?.title;
      return title ? <Link cardId={_linkId} text={title} /> : null;
    })
    .filter(Boolean);

  return fragment ? (
    <div className={`${cardStyles.className} ${className ?? ''}`} data-testid="CardBackground">
      <YTextEditor
        key={fragment.doc?.guid}
        onKeyDown={onKeyDown}
        editable={editable}
        isEditing={isEditing}
        onUpdate={onUpdate}
        onViewInstantiated={onEditorViewInstantiated}
        onViewDestroyed={onEditorViewDestroyed}
        fragment={fragment}
        schema="markdown"
        undoManager={undoManager}
        realtime={realtime}
        className={editorCss().className}
        placeholderClassName={editorPlaceholder.className}
      />
      {REFERENCES_ENABLED && references.length > 0 ? (
        // <div
        //   className={editorStyles.className}
        //   style={{
        //     padding: '11px 11px 16.5px',
        //     marginTop: 0,
        //     marginLeft: 11,
        //     marginRight: 11,
        //     marginBottom: 0,
        //     display: 'flex',
        //     flexDirection: 'column',
        //     borderTop: `1px solid ${sandA.sandA4}`,
        //   }}
        // >
        <div
          style={{
            position: 'absolute',
            top: -33,
            left: 22,
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '5.5px 11px',
              background: 'rgba(255,255,255,0.25)',
              borderRadius: 11,
              color: sand.sand12,
              fontSize: 14,
              fontWeight: '400',
            }}
          >
            <ArrowDownLeft
              style={{ position: 'relative', top: -1, left: -1 }}
              size={19}
              weight={'regular'}
            />
            {references.length} backlink
          </div>
        </div>
      ) : //   <h3 style={{ marginBottom: 0 }}>Links to this card</h3>
      //   <StyledLinkList>{references}</StyledLinkList>
      // </div>
      null}
    </div>
  ) : (
    <div className={className} />
  );
}
