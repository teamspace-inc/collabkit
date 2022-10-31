import { ComposerBase } from "../styles/themes/base/ComposerBase";
import { PopoverThread, usePopoverThread } from "./Popover";
import { PopoverThread } from "./PopoverThread";
import React from 'react'



function CellRenderer(props: any) {
  const { context } = usePopoverThread({viewId, ...});
  return <PopoverThread context={context}>{ props.value}</PopoverThread> 
}

const CellRendererRadix (props: any) => (
  <Popover.Root>
    <Popover.Trigger><span>{props.value}</span></Popover.Trigger>
    <Popover.Content>
        <Popover.Close />
        <PopoverThread />
    </Popover.Content>
  </Popover.Root>
);

const CellRendererWithHook(props: any) => {
  const { threadId, hasThread } = usePopoverThread({viewId, ...});
  return <Popover.Root>
    <Popover.Trigger><span>{props.value}</span></Popover.Trigger>
    <Popover.Content>
        <Popover.Close />
        <PopoverThread threadId={threadId}  />
    </Popover.Content>
  </Popover.Root>
}

const CellRendererWithHook2 = (props: any) => {
  const { threadId, hasThread } = usePopoverThread({viewId, ...});
  return <PopoverThread threadId={threadId}><span>{props.value}</span></PopoverThread>
}

const CellRendererWithHook2 = (props: any) => {
  const { popoverTriggerRef } = usePopoverThread({viewId, ...});
  return <div ref={popoverTriggerRef}>{props.value}</div>

}

function ViewProvider(props: { viewId: string}) {
  // sets ViewContext
}

// for this objectId, give me an open threadId 

const CellRendererSimple= (props: any) => {
  const  threadId = useThreadId({ objectId: props.id });
  const { ref } = usePopoverTrigger({ threadId });
  return <div ref={ref}>
    {props.value}
    <PopoverThread threadId={threadId} />
  </div>
}

// q: what is the meaning of canonical?
// a: 

// useLatestOpenThread
// useLatestUnresolvedThread
// useThreadId

const CellRendererTriggerComponent= (props: any) => {
  // const  threadId = useThreadId({ objectId: props.id });  // string|null
  return <PopoverThreadTrigger objectId={props.id}>
    {props.value}
  </PopoverThreadTrigger>
}

export const Example = () => {
  <Composer />
}

export const ExampleCustom = () => {
  <Composer.Root>
    <Composer.Editor />
  </Composer.Root>
}


export const Example = () => (
  <Thread threadId={threadId} />
);


export const ExampleCustom = () => (
  <PopoverThread.Root>
    <PopoverThread.Trigger><span>{props.value}</span></PopoverThread.Trigger>
    <PopoverThread.Preview>
      <Comment.Root>
        <Comment.Header></Comment.Header>
        <Comment.Content></Comment.Conten>
      </Comment.Root>
    </PopoverThread.Preview>
    <PopoverThread.Content>
        <PopoverThread.Close />
          <PopoverThread.CommentList>
            <Comment.Root>
              <Comment.Header></Comment.Header>
              <Comment.Content></Comment.Conten>
            </Comment.Root>
          </PopoverThread.CommentList>
          <Composer />
    </PopoverThread.Content>
  </PopoverThread.Root>
)

export const ExampleSimple = (props: any) => (
  <>
    {props.value}
    <PopoverThread />
  </>
)

// Right click context menu? 
export const ExampleSuperSimple = (props: any) => (
  <>
  // AND this adds a right click menu, that has a button called 'Comment'
    <PopoverThread objectId={props.id}>{props.value}</PopoverThread>
  </>
)


OpenThreadIndicator(props: { objectId: string } | { threadId: string; className: string })
useOpenThreadIndicator


export const ExampleSimple = (props: any) => (
  <>
    <PopoverThread trigger={MutableRef|HTMLElement} anchor={triggerRef} />
    
    <PopoverThread.Root>...</PopoverThread.Root>

  </>
)



export const ExampleSimple = (props: any) => (
  <>
    <PopoverThread trigger={props.value} />
  </>
)

export const ExampleSimple = (props: any) => (
  const { ref } = usePopoverThread({  })
  <>
    <div ref={ref}>{props.value}</div>
  </>
)



const threadId = '';

export const Example = () => (
  <Thread threadId={threadId} />
);

export const ExampleCustom = () => (
  <Thread.Root>
    <Thread.Header>Comments</Thread.Header>
    <Thread.CommentList>
      <Comment.Root>
        <Comment.Header></Comment.Header>
        <Comment.Content></Comment.Conten>
      </Comment.Root>
    </Thread.CommentList>
  </Thread.Root>
)