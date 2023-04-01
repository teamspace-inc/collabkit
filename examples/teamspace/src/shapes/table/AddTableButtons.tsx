import { sand } from '@radix-ui/colors';
import { useAppEvents } from '../../events';
import { Plus } from 'phosphor-react';
import { TableTarget } from 'state/constants';
import { styled } from '@stitches/react';
import { useEditorContext } from 'hooks/useEditorContext';

// position it just outside the card
const size = 27.5;
const offset = -size - 5.5;

const AddButton = styled('button', {
  position: 'absolute',
  borderRadius: 6,
  opacity: 0,
  background: sand.sand6,
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&:hover': {
    opacity: 1,
  },
});

export const AddRowButton = styled(AddButton, {
  bottom: offset,
  left: 0,
  right: 0,
  height: size,
});

export const AddColumnButton = styled(AddButton, {
  right: offset,
  top: 0,
  bottom: 0,
  width: size,
});

type TableButtonProps = { target: TableTarget };

export function AddTableRowButton({ target }: TableButtonProps) {
  const { onTableAddRow } = useAppEvents();
  return (
    <AddRowButton
      onPointerDown={(e) => {
        e.stopPropagation();
        onTableAddRow(target, e);
      }}
    >
      <Plus size={17.5} color={sand.sand9} weight="fill" />
    </AddRowButton>
  );
}

export function AddTableColumnButton({ target }: TableButtonProps) {
  const { onTableAddColumn } = useAppEvents();
  const editorContext = useEditorContext();
  return (
    <AddColumnButton
      onPointerDown={(e) => {
        e.stopPropagation();
        onTableAddColumn(editorContext, target, e);
      }}
    >
      <Plus size={17.5} color={sand.sand9} weight="fill" />
    </AddColumnButton>
  );
}
