import React from 'react';
import { renderCodeSnippet } from '../CodeEditor';

export const Code = ({ children }: React.ComponentPropsWithoutRef<'code'>) => {
  if (typeof children !== 'string') {
    return <code>{children}</code>;
  } else {
    return children.includes('\n') ? renderCodeSnippet(children) : <code>{children}</code>;
  }
};
