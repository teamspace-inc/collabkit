import React from 'react';
import * as styles from '../theme/components/Button.css';

export function Button(props: {
  type: 'primary' | 'secondary';
  text?: React.ReactNode;
  disabled?: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  className?: string;
  ['data-testid']?: string;
}) {
  return (
    <div
      data-testid={props['data-testid'] ?? 'collabkit-button'}
      className={
        props.className ??
        styles.button({
          type: props.type,
          disabled: props.disabled,
        })
      }
      role="button"
      onPointerDown={props.onPointerDown}
    >
      {props.text}
    </div>
  );
}
