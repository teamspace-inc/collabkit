import { IconContext } from './icons';
import React, { forwardRef } from 'react';
import * as styles from '../theme/components/IconButton.css';
import type { IconProps } from './icons';
import { vars } from '../theme/theme/index.css';

type Props = {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  tabIndex?: number;
  className?: string;
  active?: boolean;
  small?: boolean;
  disabled?: boolean;
} & IconProps &
  React.ComponentProps<'div'>;

const iconContextBase = {
  color: styles.iconColor,
  weight: 'bold',
  size: 16,
} as const;

export const IconButton = forwardRef<HTMLDivElement, Props>(function IconButton(props: Props, ref) {
  const { active, color, size, weight, small, disabled, ...otherProps } = props;
  const className = props.className ?? styles.button({ active, small, disabled });
  const iconContextValue: IconProps = { ...iconContextBase };
  if (color) {
    iconContextValue.color = props.color;
  }
  if (size) {
    iconContextValue.size = props.size;
  }
  if (weight) {
    iconContextValue.weight = props.weight;
  }
  if (disabled) {
    iconContextValue.color = vars.color.iconDisabled;
  }

  return (
    <div {...otherProps} className={className} ref={ref}>
      <IconContext.Provider value={iconContextValue}>{props.children}</IconContext.Provider>
    </div>
  );
});
