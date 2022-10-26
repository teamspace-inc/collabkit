import { CaretLeft } from './icons';
import { IconButton } from './IconButton';
import React from 'react';
import { useNextThread } from './useNextThread';

export const PrevThreadIconButton = (props: {}) => {
  const { onPointerDown } = useNextThread(-1);

  return (
    <IconButton onPointerDown={onPointerDown}>
      <CaretLeft size={16} weight={'regular'} />
    </IconButton>
  );
};
