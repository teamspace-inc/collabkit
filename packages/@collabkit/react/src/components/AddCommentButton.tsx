import React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './Button';
import { useAddCommentButton } from '../hooks/public/useAddCommentButton';

export function AddCommentButton(props: ComponentPropsWithoutRef<'div'>) {
  const { onClick } = useAddCommentButton();
  return (
    <Button {...props} type="primary" onClick={onClick}>
      {props.children ?? 'Add Comment'}
    </Button>
  );
}
