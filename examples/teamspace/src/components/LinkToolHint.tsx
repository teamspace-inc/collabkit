import { useAppContext } from 'hooks/useAppContext';
import { useSpaceState } from 'hooks/useSpaceContext';
import { COLUMN_WIDTH, Z } from 'state/constants';
import { getSelectedLinkables } from 'state/helpers';
import styled from 'styles/stitches.config';
import { useSnapshot } from 'valtio';

// needs to center in viewport!
const Center = styled('div', {
  display: 'grid',
  placeItems: 'center',
  overflowY: 'auto',
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
});

const LinkToolHintMessage = styled('div', {
  color: '$sand1',
  fontSize: '14px',
  borderRadius: '$radii$2',
  background: '$sand12',
  padding: '$space$2 $space$3',
  transform: 'translate(0px, 0px)',
  zIndex: Z.SYSTEM_MODAL,
  position: 'absolute',
  bottom: COLUMN_WIDTH * 4,
});

export function LinkToolHint() {
  const data = useSnapshot(useAppContext().store);
  const currentSpace = useSnapshot(useSpaceState().currentSpace);

  if (!data) return null;
  if (!data.uiState.startsWith('link')) return null;

  const linkablesCount = getSelectedLinkables({ store: data, currentSpace }).length;

  if (linkablesCount > 2) return null;

  let hint: string | null = null;

  if (linkablesCount === 0) {
    hint = 'Choose a card to link from';
  } else if (linkablesCount === 1) {
    hint = 'Choose a card to link to';
  }

  return (
    <Center>
      <LinkToolHintMessage data-testid="LinkToolHint">{hint}</LinkToolHintMessage>
    </Center>
  );
}
