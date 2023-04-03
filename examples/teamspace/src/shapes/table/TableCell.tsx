import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import { sand } from '@radix-ui/colors';
import { useAppEvents } from '../../events';
import { Cell } from 'state/constants';

const TABLE_CELL_MIN_HEIGHT = 44;

export type TableCellProps = {
  cell: Cell;
  value: string;
  isDragging: boolean;
  isEditable: boolean;
  isEditing: boolean;
  isSelected: boolean;
};

const CellDiv = styled('div', {
  textAlign: 'left',
  outline: 'none',
  lineHeight: '22px',
  fontSize: '14px',
  position: 'relative',
  color: sand.sand12,
  minHeight: TABLE_CELL_MIN_HEIGHT,
  width: '100%',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
});

const StyledTextarea = styled('textarea', {
  border: 'none',
  resize: 'none',
  width: '100%',
  height: '100%',
  lineHeight: '22px',
  fontSize: '14px',
  outline: 'none',
  padding: 11,
  background: 'transparent',

  minHeight: TABLE_CELL_MIN_HEIGHT,
  '&:disabled': {
    color: sand.sand12,
  },

  variants: {
    isDragging: {
      true: {
        userSelect: 'none',
      },
    },
  },
});

export function TableCell({
  value: initialValue,
  cell,
  isEditable,
  isEditing,
  isSelected,
  isDragging,
}: TableCellProps) {
  const { onTableCellUpdate, onTableCellHeightChange } = useAppEvents();
  const wasEditableRef = useRef<boolean>(isEditable);
  const prevHeightRef = useRef<number>(Number.MIN_SAFE_INTEGER);
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      onTableCellUpdate({ target: cell.target, value: e.target.value });
    },
    [onTableCellUpdate, cell.target]
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleHeightChange = useCallback(
    (height: number) => {
      if (height !== prevHeightRef.current) {
        onTableCellHeightChange({ target: cell.target, height });
      }
      prevHeightRef.current = height;
    },
    [onTableCellHeightChange, cell.target]
  );

  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = '0px';
      let scrollHeight = ref.current.scrollHeight;
      if (scrollHeight < TABLE_CELL_MIN_HEIGHT) {
        scrollHeight = TABLE_CELL_MIN_HEIGHT;
      }
      ref.current.style.height = scrollHeight + 'px';
      handleHeightChange(scrollHeight);
    }
  }, [handleHeightChange, value]);

  // namit: this is very similar to useAutofocus,
  // perhaps we can consolidate them
  useEffect(() => {
    if ((!wasEditableRef.current && isEditable && isSelected) || isEditing) {
      ref.current.focus();
    } else {
      ref.current.blur();
    }
    wasEditableRef.current = isEditable;
  }, [isEditable, isSelected, isEditing]);

  return (
    <CellDiv
      style={{
        width: 11 * 14,
      }}
    >
      <StyledTextarea
        data-table-cell-id={cell.target.id}
        ref={ref}
        onChange={handleChange}
        disabled={!isEditable || isDragging}
        isDragging={isDragging}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        value={value}
      />
    </CellDiv>
  );
}
