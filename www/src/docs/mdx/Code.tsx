import React from 'react';
import { renderCodeSnippet } from '../CodeEditor';

export const Code = ({ children }: React.ComponentPropsWithoutRef<'code'>) => {
  const isString = typeof children === 'string';
  const isMultiLine = isString && children.includes('\n');
  const isReactNode = isString && children?.startsWith('<');
  if (isReactNode) {
    return <code className="ReactNode">{children}</code>;
  } else if (isMultiLine) {
    return renderCodeSnippet(children);
  } else {
    return <code>{children}</code>;
  }
};
