'use client';
import React from 'react';
import { ButtonStyle, ButtonHoverStyle, ButtonIconStyle, ButtonTextStyle } from '../styles';
import { useHoverStyle } from './../useHoverStyle';

export function Button(props: {
  icon: React.ReactNode;
  text: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  const [ref, buttonStyle] = useHoverStyle<HTMLButtonElement>(ButtonStyle, ButtonHoverStyle);

  return (
    <button style={buttonStyle} ref={ref}>
      <div style={ButtonIconStyle}>{props.icon}</div>
      <div style={ButtonTextStyle}>{props.text}</div>
    </button>
  );
}
