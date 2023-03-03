import React, { cloneElement } from 'react';
import {
  FloatingFocusManager as FloatingUIFocusManager,
  FloatingContext,
  ReferenceType,
} from '@floating-ui/react';

export interface Props<RT extends ReferenceType = ReferenceType> {
  context: FloatingContext<RT>;
  children: JSX.Element;
  order?: Array<'reference' | 'floating' | 'content'>;
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>;
  guards?: boolean;
  returnFocus?: boolean;
  modal?: boolean;
  visuallyHiddenDismiss?: boolean | string;
  closeOnFocusOut?: boolean;
}
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 */
export function FloatingFocusManager<RT extends ReferenceType = ReferenceType>({
  children,
  ...props
}: Props<RT>) {
  // Adds a key to the child to work around an issue in with errorneous
  // key uniqueness warnings when running through Veaury.
  return (
    <FloatingUIFocusManager {...props}>
      {cloneElement(children, { key: 'FloatingFocusManager-child' })}
    </FloatingUIFocusManager>
  );
}
