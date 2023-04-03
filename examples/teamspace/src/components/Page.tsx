import { styled } from '@stitches/react';

import { Sidebar, SIDEBAR_WIDTH } from 'components/Sidebar';
import { useKeyEvents } from 'hooks/useKeyEvents';
import SearchBar from 'components/SearchBar';
import { useAppContext } from 'hooks/useAppContext';
import { useSnapshot } from 'valtio';
import { FOCUS_MODE_WIDTH } from 'state/constants';

const Fullscreen = styled('div', {
  position: 'absolute',
  inset: 0,
});

const Content = styled('main', {
  position: 'absolute',
  inset: 0,
  variants: {
    isSidebarOpen: {
      true: {
        left: SIDEBAR_WIDTH,
      },
    },
    isFocusing: {
      true: {
        right: FOCUS_MODE_WIDTH,
      },
    },
  },
});

type PageProps = {
  children?: React.ReactNode;
  sidebarContent?: React.ReactNode;
};

export function Page({ children, sidebarContent }: PageProps) {
  useKeyEvents();
  const { isSidebarOpen, focusModeId } = useSnapshot(useAppContext().store);

  return (
    <Fullscreen>
      <SearchBar />
      <Sidebar>{sidebarContent}</Sidebar>
      <Content isSidebarOpen={isSidebarOpen} isFocusing={!!focusModeId}>
        {children}
      </Content>
    </Fullscreen>
  );
}
