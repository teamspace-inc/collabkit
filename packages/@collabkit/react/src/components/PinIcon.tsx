import React from 'react';
import { vars } from '../theme/theme/index.css';

export function PinIcon(props: { isSelected: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.2288 37.4788L30.8539 27.8536C33.7325 24.9751 35.3496 21.0709 35.3496 17C35.3496 12.9291 33.7325 9.02492 30.8539 6.14635L30.8539 6.14633C29.4286 4.72101 27.7365 3.59038 25.8742 2.819C24.0119 2.04762 22.0159 1.6506 20.0002 1.6506C17.9845 1.6506 15.9885 2.04762 14.1263 2.819C12.264 3.59038 10.5719 4.72101 9.14656 6.14633L9.14654 6.14636C7.72122 7.57168 6.59059 9.26378 5.81921 11.126C5.04783 12.9883 4.65081 14.9843 4.65081 17C4.65081 19.0157 5.04783 21.0117 5.81921 22.8739C6.59059 24.7362 7.72122 26.4283 9.14654 27.8536L18.7717 37.4788C19.0975 37.8046 19.5394 37.9877 20.0002 37.9877C20.461 37.9877 20.903 37.8046 21.2288 37.4788Z"
        fill={props.isSelected ? vars.color.attentionBlue : vars.color.background}
        stroke={props.isSelected ? vars.color.attentionBlue : vars.color.textPrimary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
