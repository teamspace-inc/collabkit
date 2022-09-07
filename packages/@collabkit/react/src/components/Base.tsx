import React from 'react';
export function Base(props: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { children, ...otherProps } = props;

  return <div {...otherProps}>{children}</div>;
}
