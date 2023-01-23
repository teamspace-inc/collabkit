import { IconContext } from './icons';
import React, { forwardRef } from 'react';
import * as styles from '../theme/components/IconButton.css';
import type { IconProps } from './icons';

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
  const iconContextValue: IconProps = { ...iconContextBase };
  if (props.color) {
    iconContextValue.color = props.color;
  }
  if (props.size) {
    iconContextValue.size = props.size;
  }
  if (props.weight) {
    iconContextValue.weight = props.weight;
  }

  return (
    <div {...otherProps} className={className} ref={ref}>
      <IconContext.Provider value={iconContextValue}>{props.children}</IconContext.Provider>
    </div>
  );
});
