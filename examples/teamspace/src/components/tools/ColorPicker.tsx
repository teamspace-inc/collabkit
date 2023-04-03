import { styled } from '@stitches/react';
import { CardColor, CardColors, DEFAULT_CARD_COLOR } from 'utils/Colors';
import * as Tooltip from 'components/Tooltip';
import { useAppEvents } from '../../events';
import { FORMATTING_TOOLBAR_HEIGHT } from 'state/constants';

const COLOR_PALETTE_SIZE_PX = 22;

const ColorPaletteColor = styled('div', {
  width: COLOR_PALETTE_SIZE_PX,
  height: COLOR_PALETTE_SIZE_PX,
  borderRadius: COLOR_PALETTE_SIZE_PX,
  border: '1px solid $colors$scrim',
  position: 'relative',
  top: (FORMATTING_TOOLBAR_HEIGHT - COLOR_PALETTE_SIZE_PX) / 2,
  left: (FORMATTING_TOOLBAR_HEIGHT + 11 - COLOR_PALETTE_SIZE_PX) / 2,
});

const Divider = styled('div', {
  height: FORMATTING_TOOLBAR_HEIGHT,
  width: 1,
  backgroundColor: '$ui$divider',
});

const ColorPaletteColorWrapper = styled('div', {
  width: FORMATTING_TOOLBAR_HEIGHT + 11,
  height: FORMATTING_TOOLBAR_HEIGHT,
  cursor: 'pointer',

  '&:hover': {
    background: '$ui$selection',
  },

  '&:last-of-type': {
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },

  '&:first-of-type': {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  variants: {
    isSelected: {
      true: {
        background: '$ui$selection',
      },
    },
  },
});

// this is grid layout for select dropdown.
const ColorPaletteColorList = styled('div', {
  borderRadius: '$radii$1',
  background: '$ui$background',
  boxShadow: '$shadows$2',
  position: 'absolute',
  height: FORMATTING_TOOLBAR_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: 0,
});

function Color({
  colorId,
  color,
  onSelectColor,
  isSelected,
}: {
  colorId: CardColor;
  color: typeof CardColors[CardColor];
  onSelectColor: (colorId: CardColor) => void;
  isSelected: boolean;
}) {
  {
  }
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ColorPaletteColorWrapper
          isSelected={isSelected}
          data-testid={`ColorPicker-${colorId}`}
          onClick={() => onSelectColor(colorId)}
        >
          <ColorPaletteColor style={{ backgroundColor: color.paletteColor }} />
        </ColorPaletteColorWrapper>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">
        {color.label}
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function ColorPicker(props: { isOpen: boolean; color?: CardColor }) {
  const { onSelectColor, onSelectColorOpen, onSelectColorClose } = useAppEvents();

  const colors: JSX.Element[] = [];

  const selectedColorId = props.color ?? 'default';

  for (const colorId in CardColors) {
    const id = colorId as CardColor;
    colors.push(
      <Color
        colorId={id}
        color={CardColors[id]}
        onSelectColor={onSelectColor}
        isSelected={selectedColorId === colorId}
      />
    );
    colors.push(<Divider />);
  }

  // remove last divider
  colors.pop();

  let selectedColor = props.color
    ? CardColors[props.color] ?? DEFAULT_CARD_COLOR
    : DEFAULT_CARD_COLOR;

  return (
    <div data-testid="ColorPicker" onClick={props.isOpen ? onSelectColorClose : onSelectColorOpen}>
      <ColorPaletteColorWrapper>
        <ColorPaletteColor style={{ backgroundColor: selectedColor.paletteColor }} />
      </ColorPaletteColorWrapper>
      {props.isOpen ? (
        <div>
          <ColorPaletteColorList>{colors}</ColorPaletteColorList>
        </div>
      ) : null}
    </div>
  );
}
