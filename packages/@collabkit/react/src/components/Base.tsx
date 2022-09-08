import React from 'react';
export function Base(props: React.ComponentPropsWithoutRef<'div'>) {
  const { children, ...otherProps } = props;
  return <div {...otherProps}>{children}</div>;
}
