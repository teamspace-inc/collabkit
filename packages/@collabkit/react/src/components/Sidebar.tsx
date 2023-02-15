import React from 'react';
import { IconButton } from './IconButton';
import { X } from './icons';
import * as styles from '../theme/components/Sidebar.css';
import { ThemeWrapper } from './ThemeWrapper';
import { useSidebarCloseButtonProps } from '../hooks/useSidebarCloseButtonProps';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';

function SidebarCloseButton(props: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}) {
  const { onClick } = useSidebarCloseButtonProps();
  return (
    <IconButton data-testid="sidebar-close-button" onClick={onClick} style={props.style}>
      {props.children ?? <X size={16} />}
    </IconButton>
  );
}

function SidebarHeader(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div className={styles.header} {...props}>
      {props.children}
    </div>
  );
}

function SidebarTitle(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div data-testid="sidebar-title" className={styles.title} {...props}>
      {props.children}
    </div>
  );
}

function SidebarRoot(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-testid="collabkit-sidebar-root" className={styles.root} {...props} />;
}

function Sidebar(props: { children: React.ReactNode }) {
  return useIsSidebarOpen() ? (
    <ThemeWrapper>
      <SidebarRoot>{props.children}</SidebarRoot>
    </ThemeWrapper>
  ) : null;
}

export { Sidebar, SidebarHeader, SidebarCloseButton, SidebarTitle, SidebarRoot };
