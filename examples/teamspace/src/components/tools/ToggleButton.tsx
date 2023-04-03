import { styled } from '@stitches/react';
import { Icon } from 'components/Icon';
import { TextBolder, TextItalic } from 'phosphor-react';
import { FORMATTING_TOOLBAR_HEIGHT } from 'state/constants';
import { config } from 'styles/stitches.config';

export const StyledToggleButton = styled('button', {
  border: 'none',
  width: FORMATTING_TOOLBAR_HEIGHT + 22,
  height: FORMATTING_TOOLBAR_HEIGHT,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
  cursor: 'pointer',

  variants: {
    isActive: {
      true: {
        background: '$ui$selection',
      },
      false: {
        '&:hover': {
          background: '$ui$selection',
        },
      },
    },
  },
});

export function ToggleButton<T>({
  isActive,
  onClickToggle,
  value,
  icon,
}: {
  isActive: boolean;
  onClickToggle: (value: T) => void;
  value: T;
  icon: 'TextBolder' | 'TextItalic';
}) {
  let color = isActive ? config.theme.ui.activeIcon : config.theme.ui.tertiaryText;

  return (
    <StyledToggleButton
      isActive={isActive}
      onPointerDown={(e) => {
        e.preventDefault();
        onClickToggle(value);
      }}
    >
      <Icon size={19} color={color} isActive={isActive}>
        {icon === 'TextBolder' ? <TextBolder /> : <TextItalic />}
      </Icon>
    </StyledToggleButton>
  );
}
