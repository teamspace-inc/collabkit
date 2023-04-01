import { styled } from 'styles/stitches.config';

import { useSpaceState } from 'hooks/useSpaceContext';
import { COLUMN_WIDTH, FORMATTING_TOOLBAR_HEIGHT, Z } from 'state/constants';
import { useSnapshot } from 'valtio';

import { Block, Mark } from '../../types';

import React, { memo } from 'react';
import { Select } from './Select';
import { Option } from './Option';
import { ToggleButton } from './ToggleButton';
import { ColorPicker } from './ColorPicker';
import { getShapeId } from 'state/helpers';
import equal from 'fast-deep-equal';
import { EditorContextType, useEditorContext } from 'hooks/useEditorContext';

const Divider = styled('div', {
  height: FORMATTING_TOOLBAR_HEIGHT,
  width: 1,
  backgroundColor: '$ui$divider',
});

const Toolbar = styled('div', {
  margin: 0,
  textAlign: 'left',
  borderRadius: '$radii$1',
  background: '$ui$background',
  zIndex: Z.__OVERRIDE,
  width: COLUMN_WIDTH * 16,
  flexShrink: 1,
  alignItems: 'center',
  height: FORMATTING_TOOLBAR_HEIGHT,
  justifyItems: 'center',
  padding: '0',
  display: 'flex',
  pointerEvents: 'all',
  boxShadow: '$shadows$1',
});

const blocks: { value: Block; label: React.ReactNode }[] = [
  { value: 'h1', label: <h1>Title</h1> },
  { value: 'h2', label: <h2>Heading</h2> },
  { value: 'h3', label: <h3>Subheading</h3> },
  { value: 'p', label: <p>Normal</p> },
  {
    value: 'ol',
    label: (
      <div>
        <ol>
          <li>Numbered List</li>
        </ol>
      </div>
    ),
  },
  {
    value: 'ul',
    label: (
      <div>
        <ul>
          <li>Bulleted List</li>
        </ul>
      </div>
    ),
  },
];

export const FormattingToolbar = memo(function FormattingToolbar(props: {
  onToggleMark: (info: { mark: Mark; editorContext: EditorContextType }) => void;
  onSetBlockType: (info: { block: Block; editorContext: EditorContextType }) => void;
  onSelectFormatOpen: () => void;
  onSelectFormatClose: () => void;
}) {
  const { store, currentSpace: space } = useSpaceState();
  const { editing, uiState } = useSnapshot(store);
  const { editingId, formatting } = editing;
  const { items } = useSnapshot(space);
  const editorContext = useEditorContext();

  const itemId = getShapeId(editingId, space);
  if (!itemId) {
    return null;
  }

  const item = items[itemId];

  if (!item) {
    return null;
  }

  if (item.type !== 'card') {
    return null;
  }

  if (editingId?.type !== 'card') {
    console.warn('FormattingToolbar is only available for card editing');
    return null;
  }

  const marks = formatting?.marks;
  const isEm = marks?.includes('em');
  const isStrong = marks?.includes('strong');

  return (
    <Toolbar
      data-test-id="FormattingToolbar"
      onPointerDown={(e) => {
        // don't dismiss the toolbar when clicking on it
        // this prevents Canvas#onPointerDown from firing
        e.stopPropagation();
      }}
    >
      <ColorPicker isOpen={uiState === 'editing.toolbar.colorPicker.showing'} color={item.color} />
      <Divider />
      <Select<Block>
        preserveOptionPosition={false}
        isOpen={uiState === 'editing.toolbar.formats.showing'}
        onChange={(block) => props.onSetBlockType({ block, editorContext })}
        onClickClose={props.onSelectFormatClose}
        onClickOpen={props.onSelectFormatOpen}
        value={editing.formatting?.block}
      >
        {formatting?.block === 'multiple' && (
          <Option<Block> key="multiple" disabled={true} value="multiple">
            Mixed
          </Option>
        )}
        {blocks.map((block) => (
          <Option<Block> key={block.value} value={block.value}>
            {block.label}
          </Option>
        ))}
      </Select>
      <Divider />
      <ToggleButton<Mark>
        isActive={!!isStrong}
        onClickToggle={() => props.onToggleMark({ mark: 'strong', editorContext })}
        value="strong"
        icon={'TextBolder'}
      />
      <Divider />
      <ToggleButton<Mark>
        isActive={!!isEm}
        onClickToggle={() => props.onToggleMark({ mark: 'em', editorContext })}
        value="em"
        icon={'TextItalic'}
      />
    </Toolbar>
  );
},
equal);
