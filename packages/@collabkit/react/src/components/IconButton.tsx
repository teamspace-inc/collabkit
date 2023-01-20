import { IconContext } from './icons';
import React, { forwardRef } from 'react';
import * as styles from '../theme/components/IconButton.css';
import type { IconProps } from 'phosphor-react';

type Props = {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  tabIndex?: number;
  className?: string;
  active?: boolean;
} & IconProps &
  React.ComponentProps<'div'>;

const iconContextBase = {
  color: styles.iconColor,
  weight: 'bold',
  size: 16,
} as const;

export const IconButton = forwardRef<HTMLDivElement, Props>(function IconButton(props: Props, ref) {
  const { active, ...otherProps } = props;
  const className = props.className ?? styles.button({ active });
  const iconContextValue = { ...iconContextBase, ...otherProps };

  return (
    <div {...otherProps} className={className} ref={ref}>
      <IconContext.Provider value={iconContextValue}>{props.children}</IconContext.Provider>
    </div>
  );
});
