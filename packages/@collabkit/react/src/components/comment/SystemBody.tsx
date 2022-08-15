import React from 'react';
import { CheckCircle, RadioButton } from 'phosphor-react';
import { Event } from '../../constants';
import { useApp } from '../../hooks/useApp';
import { styled } from '@stitches/react';
import { systemMessageStyles } from '@collabkit/theme';

const SystemMessageText = styled('span', systemMessageStyles.text);

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
