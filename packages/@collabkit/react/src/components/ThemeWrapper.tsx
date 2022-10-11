import React, { ComponentProps, useContext } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Theme, darkThemeClassName } from '../styles/themes.css';
import { vars } from '../styles/theme';
import { ThemeContext } from './ThemeContext';

export function ThemeWrapper(props: ComponentProps<'div'>) {
  const theme = useContext(ThemeContext);
  let themeClassName = undefined;
  let customTheme = null;
  if (theme == null || theme === 'light') {
    // do nothing, uses defaults from :root
  } else if (theme === 'dark') {
    themeClassName = darkThemeClassName;
  } else {
    customTheme = theme;
  }
  return (
    <div
      {...props}
      className={themeClassName}
      data-collabkit-internal="true"
      style={{
        display: 'contents',
        // Casting to ThemeTokens is needed because we are assigning a partial
        // theme where assignInlineVars expects a full theme.
        ...(customTheme != null ? assignInlineVars(vars, customTheme as Theme) : null),
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
