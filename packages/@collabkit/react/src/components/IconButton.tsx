import React, { forwardRef } from 'react';
import * as styles from '../styles/IconButton.css';

type Props = {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  tabIndex?: number;
  className?: string;
  active?: boolean;
} & React.ComponentProps<'div'>;

export const IconButton = forwardRef<HTMLDivElement, Props>(function IconButton(props: Props, ref) {
  const { active, ...otherProps } = props;
  const className = props.className ?? styles.button({ active });
  return (
    <div {...otherProps} className={className} ref={ref}>
      {props.children}
    </div>
  );
});
