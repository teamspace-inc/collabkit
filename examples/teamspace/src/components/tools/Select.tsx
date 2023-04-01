import { styled } from '@stitches/react';
import { CaretDown } from 'phosphor-react';
import { ReactNode, cloneElement, isValidElement, Children, useState, useCallback } from 'react';
import { FORMATTING_TOOLBAR_HEIGHT, COLUMN_WIDTH } from 'state/constants';
import { config } from 'styles/stitches.config';

export const ToolbarSelect = styled('div', {
  background: '$ui$background',
  boxShadow: '$shadows$2',
  borderRadius: '$radii$1',
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
});

export const ToolbarSelectCaret = styled(CaretDown, {
  position: 'absolute',
  right: '$space$2',
  top: (FORMATTING_TOOLBAR_HEIGHT - 17) / 2,
  pointerEvents: 'none',
});

export const ToolbarSelectedOptionWrapper = styled('div', {
  position: 'relative',
});

export const ToolbarSelectWrapper = styled('div', {
  position: 'relative',
  width: COLUMN_WIDTH * 10,
});

export function Select<T>({
  children,
  value,
  onChange,
  isOpen,
  preserveOptionPosition,
  onClickOpen,
  onClickClose,
}: {
  children: ReactNode;
  value?: T;
  isOpen: boolean;
  preserveOptionPosition: boolean;
  onClickOpen: () => void;
  onClickClose: () => void;
  onChange: (newValue: T) => void;
}) {
  const onOptionChange = useCallback(
    (newValue: T) => {
      onClickClose();
      onChange(newValue);
    },
    [onClickClose, onChange]
  );

  // can't do this in css as we need to change the color
  // of the phosphor icon
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // used to offset the position of the select list
  // so that the currently selected option is under the
  // cursor when the select list is open, just like an osx
  // select list
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0);

  // clone the children to mimic the native Select and Option API
  // as much as possible, it's super flexible.
  const clonedChildren = Children.map<ReactNode, ReactNode>(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { currentValue: value, onChange: onOptionChange });
    }
    return;
  });

  const currentOption = clonedChildren?.find((child) => {
    if (isValidElement(child)) {
      return child.props.value === value;
    }
    return false;
  });

  const currentOptionElement = isValidElement(currentOption)
    ? cloneElement(currentOption, { hideCheck: true, isPreview: true })
    : null;

  return (
    <ToolbarSelectWrapper>
      <ToolbarSelectedOptionWrapper
        data-test-id="FormattingToolbarSelect"
        onPointerOver={() => setIsHovering(true)}
        onPointerOut={() => setIsHovering(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClickOpen();
          setCurrentOptionIndex(
            clonedChildren?.findIndex((child) => child === currentOption) ?? -1
          );
        }}
      >
        {currentOptionElement}
        {/* namit: consider extracting the icon out into a re-usable component which we can set the color for */}
        <ToolbarSelectCaret
          size={17}
          color={isHovering ? config.theme.ui.iconHover : config.theme.ui.icon}
        />
      </ToolbarSelectedOptionWrapper>

      {isOpen && (
        <ToolbarSelect
          style={
            preserveOptionPosition
              ? {
                  top:
                    currentOptionIndex === -1
                      ? FORMATTING_TOOLBAR_HEIGHT
                      : -FORMATTING_TOOLBAR_HEIGHT * currentOptionIndex,
                }
              : {}
          }
        >
          {clonedChildren}
        </ToolbarSelect>
      )}
    </ToolbarSelectWrapper>
  );
}
