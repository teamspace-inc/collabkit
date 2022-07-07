import { CheckCircle, RadioButton } from 'phosphor-react';
import { styled, theme } from '../UIKit';
import { Event } from '../../constants';

const SystemMessageText = styled('span', {
  display: 'flex',
  gap: '5px',
  padding: '0px 0 0px',
  color: '$neutral10',
  alignItems: 'center',
});

export function SystemBody(props: { event: Event }) {
  return props.event.type === 'system' ? (
    <SystemMessageText>
      <CheckCircle size={19} weight="fill" color={theme.colors.accent10.toString()} />
      Marked as Resolved
    </SystemMessageText>
  ) : (
    <SystemMessageText>
      <RadioButton size={19} weight="regular" color={theme.colors.neutral6.toString()} />
      Reopened this thread
    </SystemMessageText>
  );
}
