import React from 'react';
import { IconButton } from './IconButton';
import { X } from './icons';
import * as styles from '../theme/components/Sidebar.css';
import { ThemeWrapper } from './ThemeWrapper';
import { useSidebarCloseButtonProps } from '../hooks/useSidebarCloseButtonProps';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

function SidebarCloseButton(props: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}) {
  const { onClick } = useSidebarCloseButtonProps();
  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton data-testid="sidebar-close-button" onClick={onClick} style={props.style}>
          {props.children ?? <X size={16} />}
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Close</TooltipContent>
    </Tooltip>
  );
}

function SidebarHeader(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div className={styles.header} {...props} data-testid="collabkit-sidebar-header">
      {props.children}
    </div>
  );
}

function SidebarTitle(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div className={styles.title} {...props} data-testid="collabkit-sidebar-title">
      {props.children}
    </div>
  );
}

function SidebarRoot(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-testid="collabkit-sidebar-root" className={styles.root} {...props} />;
}

function Sidebar(props: React.ComponentPropsWithoutRef<'div'>) {
  return useIsSidebarOpen() ? (
    <ThemeWrapper>
      <SidebarRoot {...props} />
    </ThemeWrapper>
  ) : null;
}

export { Sidebar, SidebarHeader, SidebarCloseButton, SidebarTitle, SidebarRoot };
