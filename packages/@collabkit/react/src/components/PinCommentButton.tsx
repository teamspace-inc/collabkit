import React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './Button';
import { usePinCommentButton } from '../hooks/public/usePinCommentButton';
import { ThemeWrapper } from './ThemeWrapper';

export function PinCommentButton(props: ComponentPropsWithoutRef<'div'>) {
  const { onClick } = usePinCommentButton();
  return (
    <ThemeWrapper>
      <Button {...props} type="primary" onClick={onClick}>
        {props.children ?? 'Add Comment'}
      </Button>
    </ThemeWrapper>
  );
}
