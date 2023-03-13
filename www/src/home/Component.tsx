import React from 'react';
import {
  component,
  card,
  componentDescription,
  componentTitle,
} from '../styles/home/Components.css';
import { ComponentProps } from './Components';

export function Component(props: ComponentProps) {
  return (
    <div className={component}>
      <div className={card}>{props.component}</div>
      <div style={{ textAlign: 'left', marginTop: '16px' }}>
        <h4 className={componentTitle}>{props.title}</h4>
        <p className={componentDescription}>{props.description}</p>
      </div>
    </div>
  );
}
