import React from 'react';
import * as styles from '../theme/components/Button.css';

export function Button(
  props: {
    type: 'primary' | 'secondary';
    disabled?: boolean;
  } & React.ComponentPropsWithoutRef<'div'>
) {
  return (
    <div
      className={
        props.className ??
        styles.button({
          type: props.type,
          disabled: props.disabled,
        })
      }
      role="button"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
