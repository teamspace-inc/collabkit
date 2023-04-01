import { blue, sand } from '@radix-ui/colors';
import { styled } from 'styles/stitches.config';
import { IconContext, IconWeight } from 'phosphor-react';
import React from 'react';
import * as Tooltip from 'components/Tooltip';

const ICON_SIZE_PX = 24;
const BUTTON_SIZE_PX = 33;

export const IconButtonHighlight = styled('div', {
  padding: 2,
  borderRadius: '100%',
  transition: 'background-color .025s',
  width: BUTTON_SIZE_PX,
  height: BUTTON_SIZE_PX,
  variants: {
    isHovering: {
      true: {},
      false: {},
    },
    isActive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      isActive: true,
      isHovering: true,
      css: {
        backgroundColor: '$colors$buttonSelectedBackground',
      },
    },
    {
      isActive: false,
      isHovering: true,
      css: {
        backgroundColor: '$colors$buttonHoveringBackground',
      },
    },
    {
      isActive: true,
      isHovering: false,
      css: {
        backgroundColor: '$colors$buttonSelectedBackground',
      },
    },
  ],
});

export const StyledIconButton = styled('button', {
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  background: 'none',
  backgroundColor: 'none',
  border: 'none',
});

export function IconButton(
  props: React.HTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean;
    activeIconWeight?: IconWeight;
    iconWeight?: IconWeight;
    tooltip: string | React.ReactNode;
    offset?: number[];
    // namit: todo implement this
    disabled?: boolean;
  }
) {
  const {
    onPointerOver,
    onPointerOut,
    onPointerDown,
    onPointerUp,
    iconWeight,
    activeIconWeight,
    isActive,
    offset,
    ...passProps
  } = props;

  const iconOffset = offset ?? [0, 0];

  const [isPointerDown, setIsPointerDown] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <StyledIconButton
      {...passProps}
      onPointerOver={(e) => {
        setIsHovering(true);
        onPointerOver?.(e);
      }}
      onPointerOut={(e) => {
        setIsPointerDown(false);
        setIsHovering(false);
        onPointerOut?.(e);
      }}
      onPointerDown={(e) => {
        setIsPointerDown(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setIsPointerDown(false);
        onPointerUp?.(e);
      }}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <IconButtonHighlight isHovering={isHovering} isActive={props.isActive}>
            <IconContext.Provider
              value={{
                size: ICON_SIZE_PX,
                color: isPointerDown ? sand.sand11 : props.isActive ? blue.blue10 : sand.sand10,
                weight: props.isActive ? activeIconWeight ?? 'fill' : iconWeight ?? 'regular',
              }}
            >
              <div style={{ position: 'relative', top: 3 + iconOffset[1], left: iconOffset[0] }}>
                {props.children}
              </div>
            </IconContext.Provider>
          </IconButtonHighlight>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">
          {props.tooltip}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </StyledIconButton>
  );
}
