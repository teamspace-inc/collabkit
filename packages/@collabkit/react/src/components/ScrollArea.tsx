import React, { forwardRef } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as styles from '../styles/ScrollArea.css';

export const ScrollAreaRoot: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Root {...props} ref={ref} className={props.className ?? styles.root} />
));

export const ScrollAreaViewport: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaViewportProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Viewport {...props} ref={ref} className={props.className ?? styles.viewport} />
));

export const ScrollAreaScrollbar: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Scrollbar {...props} ref={ref} className={props.className ?? styles.scrollbar} />
));

export const ScrollAreaThumb: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaThumbProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Thumb {...props} ref={ref} className={props.className ?? styles.thumb} />
));

export const ScrollAreaCorner: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaCornerProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Corner {...props} ref={ref} className={props.className ?? styles.corner} />
));
