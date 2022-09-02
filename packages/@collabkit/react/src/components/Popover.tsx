import React, { cloneElement, useMemo, useState } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useHover,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react-dom-interactions';
import { mergeRefs } from 'react-merge-refs';
import { PopoverThread } from './PopoverThread';
import { useApp } from '../hooks/useApp';

interface Props {
  children: JSX.Element;
  context: ReturnType<typeof usePopoverThread>;
}

export function usePopoverThread() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    reference: tooltipReference,
    floating: tooltipFloating,
    strategy: tooltipStrategy,
    context: tooltipContext,
  } = useFloating({
    placement: 'right-start',
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
  });

  const {
    reference: menuReference,
    floating: menuFloating,
    strategy: menuStrategy,
    context: menuContext,
  } = useFloating({
    placement: 'right-start',
    open: menuOpen,
    onOpenChange: setMenuOpen,
  });

  const { getReferenceProps: getTooltipReferenceProps, getFloatingProps: getTooltipFloatingProps } =
    useInteractions([
      useHover(tooltipContext, {
        handleClose: safePolygon(),
      }),
      useDismiss(tooltipContext),
    ]);

  const { getReferenceProps: getMenuReferenceProps, getFloatingProps: getMenuFloatingProps } =
    useInteractions([useClick(menuContext), useDismiss(menuContext)]);

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([tooltipReference, menuReference]),
    [tooltipReference, menuReference]
  );

  const getProps = (userProps: any) =>
    getTooltipReferenceProps(getMenuReferenceProps({ ref, ...userProps }));

  return {
    getProps,
    menuContext,
    tooltipContext,
    getMenuFloatingProps,
    getTooltipFloatingProps,
    setMenuOpen,
  };
}

export const PopoverTrigger = ({ children, context }: Props) => {
  const {
    getProps,
    menuContext,
    tooltipContext,
    getMenuFloatingProps,
    getTooltipFloatingProps,
    setMenuOpen,
  } = context;
  const { theme } = useApp();
  return (
    <>
      {cloneElement(children, getProps(children.props))}
      <FloatingPortal>
        {menuContext.open && (
          <FloatingFocusManager context={menuContext}>
            <div
              ref={menuContext.floating}
              className={theme.className}
              style={{
                position: menuContext.strategy,
                top: menuContext.y ?? 0,
                left: menuContext.x ?? 0,
                outline: 'none',
              }}
              {...getMenuFloatingProps()}
            >
              <PopoverThread
                threadId={'table-cell-thread' /*threadId ?? generateThreadId()*/}
                //info={info}
                isPreview={false}
                style={{
                  width: 264,
                  border: '1px solid #E3E9ED',
                  boxShadow:
                    '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
                }}
              />
            </div>
          </FloatingFocusManager>
        )}
        {!menuContext.open && tooltipContext.open && (
          <FloatingFocusManager context={tooltipContext}>
            <div
              ref={tooltipContext.floating}
              className={theme.className}
              style={{
                position: tooltipContext.strategy,
                top: tooltipContext.y ?? 0,
                left: tooltipContext.x ?? 0,
                outline: 'none',
              }}
              onClick={() => setMenuOpen(true)}
              {...getTooltipFloatingProps()}
            >
              <PopoverThread
                threadId={'table-cell-thread' /*threadId ?? generateThreadId()*/}
                //info={info}
                isPreview={true}
                style={{
                  width: 264,
                  border: '1px solid #E3E9ED',
                  boxShadow:
                    '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
                }}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
