import React, { ComponentProps } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useApp } from '../hooks/useApp';
import { Theme, vars } from '../styles/themes.css';

export function ThemeWrapper(props: ComponentProps<'div'>) {
  const { themeClassName, themeTokens } = useApp();
  return (
    <div
      {...props}
      className={themeClassName}
      data-collabkit-internal="true"
      style={{
        display: 'contents',
        // Casting to ThemeTokens is needed because we are assigning a partial
        // theme where assignInlineVars expects a full theme.
        ...assignInlineVars(vars, themeTokens as Theme),
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
