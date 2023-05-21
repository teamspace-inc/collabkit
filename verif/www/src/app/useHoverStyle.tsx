'use client';
import React from 'react';
import { useHover } from './useHover';

export function useHoverStyle<T extends HTMLElement>(
  style: React.CSSProperties,
  hoverStyle: React.CSSProperties
): [React.RefObject<T>, React.CSSProperties] {
  const [ref, isHovered] = useHover<T>();

  return [
    ref,
    {
      ...style,
      ...(isHovered ? hoverStyle : {}),
    },
  ];
}
