import React from 'react';
import { component, card } from '../styles/home/Components.css';
import { ComponentProps } from './Components';

export function Component(props: ComponentProps) {
  return (
    <div className={component}>
      <div className={card}>{props.component}</div>
    </div>
  );
}
