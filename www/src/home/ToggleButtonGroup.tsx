import React from 'react';
import {
  toggleButton,
  toggleButtonGroup,
  toggleButtonGroupOptions,
  toggleButtonGroupTitle,
} from '../styles/home/Customisable.css';

export function ToggleButtonGroup(props: {
  title: string;
  options: { value: string; node: React.ReactElement }[];
  value: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <div className={toggleButtonGroup}>
      <div className={toggleButtonGroupTitle}>{props.title}</div>
      <div className={toggleButtonGroupOptions}>
        {props.options.map((option) => (
          <div
            key={option.value}
            className={toggleButton({ active: props.value === option.value })}
            style={{ width: 50, height: 50, borderRadius: '50px' }}
            onClick={() => props.onChange(option.value)}
          >
            {React.cloneElement(option.node, {
              style: {
                ...option.node.props.style,
                width: 50,
                height: 50,
                lineHeight: '50px',
                borderRadius: '50px',
              },
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
