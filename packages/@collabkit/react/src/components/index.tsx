import React from 'react';
import { sand } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

const { styled } = createStitches({
  theme: {
    fonts: {},
    space: {},
    sizes: {},
    fontSizes: {},
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    radii: {},
    zIndices: {},
    colors: {
      gray100: sand.sand1,
      gray200: sand.sand4,
      gray300: 'hsl(206 6% 56%)',
      gray400: 'hsl(206 6% 44%)',
      violet100: 'hsl(252 87% 96%)',
      violet200: 'hsl(252 83% 87%)',
      violet300: 'hsl(252 62% 54%)',
      violet400: 'hsl(250 55% 48%)',

      // token aliases
      background: 'white',
      input: '$gray100',
      line: '$gray200',
      text: '$gray400',
      accent: '$violet300',
    },
  },
});

// const Button = styled('button', {
//   backgroundColor: '#fff',
//   border: 'none',
//   borderRadius: '100px',
//   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 6px 11px rgba(0, 0, 0, 0.1)',
//   fontSize: '13px',
//   height: 55,
//   width: 55,

//   '&:hover': {
//     cursor: 'pointer',
//     backgroundColor: 'lightgray',
//   },
// });

// function FloatingCommentButton() {
//   return (
//     <Button>
//       <ChatCircle size={33} weight={'fill'} color={ACCENT} />
//     </Button>
//   );
// }

// const StyledCollabKit = styled('div', {
//   fontFamily: 'apple-system, BlinkMacSystemFont, sans-serif',
// });

// const StyledFace = styled('img', {
//   borderRadius: 100,
//   width: 32,
//   height: 32,
// });

// function Face(props: { url: string }) {
//   return <StyledFace src={props.url} />;
// }

// const StyledCommentIndicator = styled('div', {
//   borderRadius: '22px 22px 22px 1px',
//   padding: 11,
//   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 6px 11px rgba(0, 0, 0, 0.1)',
//   backgroundColor: ACCENT,
//   display: 'inline-flex',
//   gap: 6,
// });

// function CommentIndicator(props: { thread: CommentThread }) {
//   const photoURLs = Object.keys(props.thread.actors).map(
//     (actorId) => props.thread.actors[actorId].avatar
//   );
//   return (
//     <StyledCommentIndicator>
//       {photoURLs.map((url) => (
//         <Face key={url} url={url} />
//       ))}
//     </StyledCommentIndicator>
//   );
// }

// function CommentIcon() {
//   return (
//     <ChatTeardrop
//       size={40}
//       color={ACCENT}
//       weight={'fill'}
//       style={{
//         filter: `drop-shadow(0px 6px 11px rgba(0, 0, 0, 0.1))
//                  drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.1))`,
//       }}
//     />
//   );
// }

// function CollabKitComponents() {
//   const { timeline: threads } = useSnapshot(store);

//   return (
//     <Tooltip.Provider>
//       <StyledCollabKit>
//         <br />
//         <HInfo>Thread With Comments</HInfo>
//         <Thread thread={threads['thread-1'] as any} onCommentSend={events.onSend} />
//         <br />
//         <HInfo>New Thread</HInfo>
//         <Thread thread={threads['thread-2'] as any} onCommentSend={events.onSend} />
//         <br />
//         <HInfo>Floating Comment button</HInfo>
//         <FloatingCommentButton />
//         <br />
//         <HInfo>Comment Icon</HInfo>
//         <CommentIcon />
//         <br />
//         <HInfo>Comment Indicator</HInfo>
//         <CommentIndicator thread={store.timeline['thread-1']} />
//       </StyledCollabKit>
//     </Tooltip.Provider>
//   );
// }

// function HInfo(props: { children: React.ReactNode }) {
//   return (
//     <h1
//       style={{
//         padding: 11,
//         textTransform: 'uppercase',
//         fontSize: 14,
//         lineHeight: '24px',
//         color: 'gray',
//       }}
//     >
//       {props.children}
//     </h1>
//   );
// }

// function CommentPrototype() {
//   const { uiState } = useSnapshot(store);

//   return (
//     <div>
//       <img
//         data-commentable="true"
//         data-commentable-id="https://66.media.tumblr.com/24574d8a8f86466ddef280cb13442692/bd7201747b26c550-e1/s540x810/601b02f3f992dd20cac8598a5b66ed0ef3d993f9.gif"
//         style={{ width: 400 }}
//         src="https://66.media.tumblr.com/24574d8a8f86466ddef280cb13442692/bd7201747b26c550-e1/s540x810/601b02f3f992dd20cac8598a5b66ed0ef3d993f9.gif"
//       />
//       <img
//         data-commentable="true"
//         data-commentable-id="https://66.media.tumblr.com/7dd49c8b17fc9d2c2ac9d0352523eb55/tumblr_o2ayekYBiz1upvbufo1_r3_540.gif"
//         style={{ width: 400 }}
//         src="https://66.media.tumblr.com/7dd49c8b17fc9d2c2ac9d0352523eb55/tumblr_o2ayekYBiz1upvbufo1_r3_540.gif"
//       />
//       <br />
//       <br />
//       {/* <div style={{ display: 'flex', gap: '10px' }}>
//         {uiState === 'selecting' && 'Select an image to comment on it'}
//         <button onClick={() => events.onFloatingCommentButtonClick()}>
//           {store.uiState === 'selecting' ? 'Cancel' : 'Comment'}
//         </button>
//       </div> */}
//       <style>
//         {`.commentable-hover {
//           border: 2px solid red;
//         }
//         .commentable-selected {
//           border: 2px solid green;
//         }`}
//       </style>
//     </div>
//   );
// }

export function CollabKitPlayground() {
  return (
    <div style={{ padding: 22 }}>
      <h1 style={{ padding: 11, paddingBottom: 0 }}>CollabKit</h1>
      {/* <Thread
        timeline={store.timelines['thread-1']}
        profiles={store.profiles}
        onSend={events.onSend}
      /> */}
    </div>
  );
}
