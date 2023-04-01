import { styled } from '@stitches/react';
import { Check } from 'phosphor-react';
import React, { useState } from 'react';
import { DEFAULT_ICON_COLOR } from 'styles/stitches.config';
import { editorHeadingStyles, editorPStyles, editorListStyles } from 'styles/editorStyles';
import { FORMATTING_TOOLBAR_HEIGHT, COLUMN_WIDTH } from 'state/constants';

const OPTION_CHECK_SIZE = 19;

export const ToolbarOption = styled('div', editorHeadingStyles, editorPStyles, editorListStyles, {
  fontSize: '14px',
  height: FORMATTING_TOOLBAR_HEIGHT,
  lineHeight: `${FORMATTING_TOOLBAR_HEIGHT}px`,
  width: COLUMN_WIDTH * 10,
  cursor: 'pointer',
  padding: '0px $space$1 0px $space$5',
  margin: '0',
  position: 'relative',
  color: '$ui$text',
  display: 'flex',
  alignItems: 'center',

  variants: {
    disabled: {
      true: {
        color: '$ui$tertiaryText',
      },
    },

    isPreview: {
      true: {
        height: FORMATTING_TOOLBAR_HEIGHT,
        lineHeight: `${FORMATTING_TOOLBAR_HEIGHT}px`,
        color: '$ui$text',
      },
    },

    isSelected: {
      true: {
        // background: '$ui$selection',
        color: '$ui$selectionText',
      },
    },

    isHovering: {
      true: {
        background: '$ui$selection',
      },
    },

    hideCheck: {
      true: {
        paddingLeft: '$space$2',
        lineHeight: `${FORMATTING_TOOLBAR_HEIGHT}px`,
      },
    },
  },

  '&:hover': {
    background: '$ui$selection',
    borderColor: 'transparent',
  },

  '& > h1, & > h2, & > h3, & > ul, & > ol, & li': {
    lineHeight: `${FORMATTING_TOOLBAR_HEIGHT}px`,
    margin: 0,
    padding: 0,
    marginBlockEnd: '0px !important',
  },
});

export const ToolbarOptionCheck = styled(Check, {
  position: 'absolute',
  left: (FORMATTING_TOOLBAR_HEIGHT - OPTION_CHECK_SIZE) / 2 + 6,
  top: (FORMATTING_TOOLBAR_HEIGHT - OPTION_CHECK_SIZE) / 2,
});

export function Option<T>({
  value,
  children,
  disabled,
  currentValue,
  hideCheck,
  isPreview,
  onChange,
}: {
  value: T;
  children: React.ReactNode;
  disabled?: boolean;
  currentValue?: T;
  hideCheck?: boolean;
  isPreview?: boolean;
  onChange?: (newValue: T) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const isSelected = currentValue === value;

  return (
    <ToolbarOption
      data-test-id={`FormattingToolbarOption-${value}`}
      disabled={disabled}
      isPreview={isPreview}
      isHovering={isHovering}
      isSelected={isSelected}
      onPointerOver={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
      hideCheck={hideCheck}
      onPointerDown={(e) => {
        if (!isPreview) {
          onChange?.(value);
        }
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {isSelected && !hideCheck && (
        <ToolbarOptionCheck size={OPTION_CHECK_SIZE} color={DEFAULT_ICON_COLOR} weight={'bold'} />
      )}
      {children}
    </ToolbarOption>
  );
}
