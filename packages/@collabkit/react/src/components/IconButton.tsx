import React, { forwardRef } from 'react';
import * as styles from '../styles/IconButton.css';

type Props = {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  tabIndex?: number;
  className?: string;
} & React.ComponentProps<'div'>;

export const IconButton = forwardRef<HTMLDivElement, Props>(function IconButton(props: Props, ref) {
  const className = props.className ?? styles.button;
  return (
    <div {...props} className={className} ref={ref}>
      {props.children}
    </div>
  );
});
