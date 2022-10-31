import { CaretRight } from './icons';
import { IconButton } from './IconButton';
import { useNextThread } from '../hooks/useNextThread';
import React from 'react';

export const NextThreadIconButton = (props: {}) => {
  const { onPointerDown } = useNextThread();

  return (
    <IconButton onPointerDown={onPointerDown}>
      <CaretRight size={16} weight={'regular'} />
    </IconButton>
  );
};
