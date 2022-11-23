import { IconContext } from './icons';
import React, { forwardRef } from 'react';
import * as styles from '../styles/components/IconButton.css';
import { vars } from '../styles/theme/index.css';

type Props = {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  tabIndex?: number;
  className?: string;
  active?: boolean;
} & React.ComponentProps<'div'>;

const iconContextValue = {
  color: styles.iconColor,
  weight: 'bold',
  size: 16,
} as const;

export const IconButton = forwardRef<HTMLDivElement, Props>(function IconButton(props: Props, ref) {
  const { active, ...otherProps } = props;
  const className = props.className ?? styles.button({ active });

  return (
    <div {...otherProps} className={className} ref={ref}>
      <IconContext.Provider value={iconContextValue}>{props.children}</IconContext.Provider>
    </div>
  );
});
