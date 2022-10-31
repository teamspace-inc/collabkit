import React, { forwardRef } from 'react';
import { ThreadInfo } from '@collabkit/core';
import CommentList from '../CommentList';
import { useApp } from '../../hooks/useApp';
import { useThread } from '../../hooks/useThread';
import { useSnapshot } from 'valtio';

import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from '../ScrollArea';

import Composer from '../composer/Composer';
import * as styles from '../../styles/components/PopoverThread.css';
import { ThemeWrapper } from '../ThemeWrapper';

// import { useComposer } from '../hooks/useComposer';
// import { ButtonGroup } from './ButtonGroup';

import { Thread } from '../Thread';
// import { useTimeline } from '../../hooks/useTimeline';

// import { ResolveThreadIconButton } from './ResolveThreadIconButton';
// import { PrevThreadIconButton } from './PrevThreadIconButton';
// import { NextThreadIconButton } from './NextThreadIconButton';
// import { CloseThreadIconButton } from './CloseThreadIconButton';

// type PopoverThreadContextValue = {
//   preview: React.ReactNode;
//   trigger: React.ReactNode;
//   content: React.ReactNode;
// };

// const PopoverThreadContext = React.createContext(null);

// function PopoverThread() {
//   <div></div>;
// }

// function PopoverThreadTrigger(props: { children: React.ReactNode }) {}

// function PopoverThreadContent() {}

// function PopoverThreadPreview() {}

// PopoverThread.Trigger = PopoverThreadTrigger;
// PopoverThread.Content = PopoverThreadContent;
// PopoverThread.Preview = PopoverThreadPreview;

// export function PopoverThreadHeader() {
//   return (
//     <div className={styles.header}>
//       <div className={styles.iconList}>
//         <PrevThreadIconButton />
//         <NextThreadIconButton />
//         <ResolveThreadIconButton />
//       </div>
//       <div style={{ flex: 1 }} />
//       <CloseThreadIconButton />
//     </div>
//   );
// }

// const PopoverThreadProvider = (props: PopoverThreadProps & { children: React.ReactNode }) => {
//   return (
//     <ThreadProvider {...props}>
//       <ThemeWrapper>{props.children}</ThemeWrapper>
//     </ThreadProvider>
//   );
// };

// const PopoverThreadContentInner = forwardRef<
//   Handle,
//   PopoverThreadProps & React.ComponentPropsWithoutRef<'div'>
// >(function PopoverThreadRoot(
//   props: PopoverThreadProps & React.ComponentPropsWithoutRef<'div'>,
//   ref
// ) {
//   const { store } = useApp();
//   const { workspaceId, userId } = useSnapshot(store);

//   const { isEmpty, list } = useThread({
//     ...props,
//     store,
//     workspaceId,
//   });

//   if (!workspaceId || !userId) {
//     return null;
//   }

//   return (
//     <div className={styles.root} data-collabkit-internal="true" ref={ref}>
//       {/* <PopoverThreadHeader /> */}
//       <ScrollAreaRoot>
//         <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
//           {props.children}
//           <div className={styles.spacerBottom} />
//         </ScrollAreaViewport>
//         <ScrollAreaScrollbar orientation="vertical">
//           <ScrollAreaThumb />
//         </ScrollAreaScrollbar>
//         <ScrollAreaCorner />
//       </ScrollAreaRoot>
//     </div>
//   );

//   // return (
//   //   <div className={styles.root} data-collabkit-internal="true" ref={ref}>
//   //     {props.children}
//   //   </div>
//   // );
// });

export type PopoverThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  maxAvailableSize?: { width: number; height: number } | null;
  hideComposer?: boolean;
  formatTimestamp?: (timestamp: number) => string;
}; // make this an extension of ThreadProps

export type Handle = HTMLDivElement | null;

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);

  useThread({
    ...props,
    store,
    workspaceId,
  });

  if (!workspaceId || !userId) {
    return null;
  }

  return (
    <Thread.Provider {...props}>
      <ThemeWrapper>
        <div className={styles.root} data-collabkit-internal="true" ref={ref}>
          {/* <PopoverThreadHeader /> */}
          <ScrollAreaRoot>
            <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
              <CommentList />
              {props.hideComposer ? null : <Composer autoFocus={props.autoFocus ?? true} />}
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      </ThemeWrapper>
    </Thread.Provider>
  );
});
