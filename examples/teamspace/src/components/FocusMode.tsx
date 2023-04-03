import { styled } from '@stitches/react';
import { useSnapshot } from 'valtio';

import { Modal } from 'components/Modal';
import { TextCard } from 'shapes/textcard/TextCard';
import { useAppEvents } from '../events';
import { useAppState } from 'hooks/useSpaceContext';
import { FOCUS_MODE_WIDTH, Z } from 'state/constants';
import { IconButton } from './IconButton';
import { X } from 'phosphor-react';
import { PageTool } from './tools/EditingTools';
import { Autocomplete } from './tools/Autocomplete';
import { FormattingToolbar } from './tools/FormattingToolbar';
import { EditorContext } from 'hooks/useEditorContext';
import { ScrollArea, ScrollAreaThumb, ScrollAreaViewport, Scrollbar } from './Scroll';

const FocusModeContainer = styled('div', {
  position: 'absolute',
  inset: 0,
  left: 'unset',
  paddingTop: 44,
  width: FOCUS_MODE_WIDTH,
  overflow: 'hidden',
  background: 'white',
  minHeight: '500px',
  borderLeft: '1px solid $sand4',
  zIndex: Z.CANVAS_TOOL,
});

const CloseButton = styled(IconButton, {
  position: 'absolute',
  top: '11px',
  right: '11px',
  zIndex: Z.SYSTEM_MODAL,
});

export function FocusMode() {
  const { store, currentSpace } = useAppState();
  const data = useSnapshot(store);

  const appEvents = useAppEvents();

  if (!data.focusModeId) {
    return null;
  }

  // @todo focus mode only works for cards at the moment
  if (data.focusModeId.type !== 'card') {
    return null;
  }

  const autocomplete =
    data.uiState === 'editing.autocomplete.showing' ? (
      <PageTool point={data.editing.autocomplete.point}>
        <Autocomplete
          onScrollList={appEvents.onScrollList}
          autocomplete={store.editing.autocomplete}
        />
      </PageTool>
    ) : null;

  const formattingToolbar = data.uiState.startsWith('editing') && (
    <FormattingToolbar
      onSelectFormatClose={appEvents.onSelectFormatClose}
      onSelectFormatOpen={appEvents.onSelectColorOpen}
      onSetBlockType={appEvents.onSetBlockType}
      onToggleMark={appEvents.onToggleMark}
    />
  );

  const card = data.focusModeId && data.cards[data.focusModeId.id];

  return card ? (
    <Modal onClose={appEvents.onModalClose}>
      <EditorContext.Provider value={{ target: { type: 'pane', id: 'focusMode' } }}>
        <FocusModeContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton tooltip={'Close'} onClick={() => appEvents.onModalClose()}>
            <X />
          </CloseButton>
          <div
            style={{ position: 'absolute', left: 11, top: 6, zIndex: Z.SYSTEM_MODAL, height: 55 }}
          >
            {formattingToolbar}
          </div>
          <ScrollArea
            style={{
              height: '100%',
              width: FOCUS_MODE_WIDTH,
            }}
          >
            <ScrollAreaViewport>
              {autocomplete}
              <TextCard
                fullHeight={false}
                isRounded={false}
                editable={true}
                target={data.focusModeId}
                isEditing={data.editing.editingId === data.focusModeId}
                isDragging={false}
                isSmall={false}
                undoManager={currentSpace?.undoManager}
              />
              <Scrollbar>
                <ScrollAreaThumb />
              </Scrollbar>
            </ScrollAreaViewport>
          </ScrollArea>
        </FocusModeContainer>
      </EditorContext.Provider>
    </Modal>
  ) : null;
}
