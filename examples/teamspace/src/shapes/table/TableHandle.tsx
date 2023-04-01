import { sand } from '@radix-ui/colors';
import { IconContext, Circle, DotsSix, DotsSixVertical } from 'phosphor-react';
import { useShapeEvents } from '@tldraw/core';
import { TableColumnTarget, TableRowTarget } from 'state/constants';
import { styled } from '@stitches/react';

export const HANDLE_CAPTURE_AREA_SIZE = 44;
export const HANDLE_ICON_SIZE = 22 - 5.5;
export const HANDLE_SIZE = 27.5;

export const TableHandleCaptureArea = styled('div', {
  padding: 10,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  variants: {
    orientation: {
      vertical: {
        top: 0,
        left: -HANDLE_CAPTURE_AREA_SIZE,
        bottom: 0,
        width: HANDLE_CAPTURE_AREA_SIZE,
      },
      horizontal: {
        top: -HANDLE_CAPTURE_AREA_SIZE,
        left: 0,
        right: 0,
        height: HANDLE_CAPTURE_AREA_SIZE,
      },
    },
  },
});

export const StyledTableHandle = styled('div', {
  position: 'absolute',

  borderRadius: 222,
  padding: 0,
  background: 'white',
  border: '1px solid $sand3',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: HANDLE_SIZE,
  height: HANDLE_SIZE,

  variants: {
    isSelected: {
      true: {
        background: '$colors$active',
      },
    },
  },
});

export type HandleProps = {
  isSelected: boolean;
  isVisible: boolean;
  target: TableColumnTarget | TableRowTarget;
};

const HandleIcons = {
  tableRow: () => <DotsSixVertical weight="fill" />,
  tableColumn: () => <DotsSix weight="fill" />,
  table: () => <Circle weight="regular" />,
};

export function TableHandle({ target, isVisible, isSelected }: HandleProps) {
  const events = useShapeEvents(target);
  const orientation = target.type === 'tableRow' ? 'vertical' : 'horizontal';
  const iconProps = {
    size: HANDLE_ICON_SIZE,
    color: isSelected ? sand.sand1 : sand.sand8,
  };

  return (
    <TableHandleCaptureArea orientation={orientation} {...events}>
      {isVisible && (
        <StyledTableHandle isSelected={isSelected}>
          <IconContext.Provider value={iconProps}>
            {HandleIcons[target.type]()}
          </IconContext.Provider>
        </StyledTableHandle>
      )}
    </TableHandleCaptureArea>
  );
}
