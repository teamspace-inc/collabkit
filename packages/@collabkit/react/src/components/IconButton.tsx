import { IconContext } from 'phosphor-react';
import React, { forwardRef, useMemo } from 'react';
import * as styles from '../styles/IconButton.css';
import { useTheme } from './ThemeContext';

type Props = {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  tabIndex?: number;
  className?: string;
  active?: boolean;
} & React.ComponentProps<'div'>;

export const IconButton = forwardRef<HTMLDivElement, Props>(function IconButton(props: Props, ref) {
  const { active, ...otherProps } = props;
  const { themeTokens } = useTheme();
  const className = props.className ?? styles.button({ active });
  const iconContextValue = useMemo(
    () => ({ color: themeTokens?.iconButton.color, weight: 'bold', size: 16 }),
    [themeTokens]
  );

  return (
    <div {...otherProps} className={className} ref={ref}>
      <IconContext.Provider value={iconContextValue}>{props.children}</IconContext.Provider>
    </div>
  );
});
