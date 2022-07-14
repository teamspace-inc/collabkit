import React from 'react';
import { CheckCircle, RadioButton } from 'phosphor-react';
import { styled } from '../UIKit';
import { Event } from '../../constants';
import { useApp } from '../useApp';

const SystemMessageText = styled('span', {
  display: 'flex',
  gap: '$padding$0',
  padding: '0px 0 0px',
  color: '$colors$primaryText',
  alignItems: 'center',
});

export function SystemBody(props: { event: Event }) {
  const { theme } = useApp();
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
