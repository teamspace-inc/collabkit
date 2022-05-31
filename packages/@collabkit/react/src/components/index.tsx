import { blackA, blue, mauve, sand } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

import {
  IconContext,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  X,
  ChatCircle,
  ArrowUp,
  ChatTeardrop,
} from 'phosphor-react';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Tooltip from '@radix-ui/react-tooltip';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Actor, CommentThread, events, store } from '../constants';

const ACCENT = blue.blue10;

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

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollArea.Root, {
  width: '100%',
  height: '352px',
  borderRadius: 4,
  overflow: 'hidden',
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const StyledViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

const StyledCorner = styled(ScrollArea.Corner, {
  background: blackA.blackA8,
});

const Button = styled('button', {
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: '100px',
  boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 6px 11px rgba(0, 0, 0, 0.1)',
  fontSize: '13px',
  height: 55,
  width: 55,

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'lightgray',
  },
});

function FloatingCommentButton() {
  return (
    <Button>
      <ChatCircle size={33} weight={'fill'} color={ACCENT} />
    </Button>
  );
}

const StyledComment = styled('div', {
  padding: '6px 10px',
  display: 'flex',
  gap: '6px',
  fontSize: 16,
  lineHeight: '24px',
  overflowWrap: 'break-word',

  '&:hover': {
    background: sand.sand3,
  },
});

const StyledAvatar = styled('img', {
  width: 24,
  height: 24,
  flexShrink: 0,
  borderRadius: 28,
  background: '$accent',
});

function Comment(props: { message: string; actor: Actor }) {
  return (
    <StyledComment>
      <StyledAvatar src={props.actor.photoURL} />
      <StyledMessage>{props.message}</StyledMessage>
    </StyledComment>
  );
}

const StyledComposerTextarea = styled(TextareaAutosize, {
  padding: '12px 36px 12px 40px',
  fontSize: 16,
  lineHeight: '24px',
  borderRadius: '0px 0px 11px 11px',
  border: 'none',
  background: '$input',
  width: 'calc(100%)',
  fontFamily: 'inherit',
  resize: 'none',
  height: '96px',
  boxSizing: 'border-box',
  borderTop: '1px solid $gray200',

  '&:focus': {
    outline: 'none',
  },

  variants: {
    fullyRounded: {
      true: {
        borderRadius: '11px',
        borderTop: 'none',
      },
    },
  },
});

const StyledComposerSendButton = styled(Tooltip.TooltipTrigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: ACCENT,
  width: 28,
  height: 28,
  position: 'absolute',
  right: 10,
  top: 10,
  borderRadius: 28,
  border: 'none',

  variants: {
    disabled: {
      true: {
        backgroundColor: sand.sand8,
      },
    },
  },
});

function Composer(props: { onCommentSend: (message: string) => void; isFloating: boolean }) {
  const [message, setMessage] = useState('');

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <StyledAvatar style={{ position: 'absolute', left: 10, top: 12 }} />
      <StyledComposerTextarea
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here..."
        fullyRounded={props.isFloating}
      />
      <Tooltip.Root>
        <StyledComposerSendButton
          disabled={message.trim().length === 0}
          onClick={(e) => {
            if (message.trim().length > 0) {
              props.onCommentSend(message);
            }
          }}
        >
          <ArrowUp
            size={14}
            color={'white'}
            weight={'bold'}
            style={{ position: 'relative', cursor: 'pointer' }}
          />
        </StyledComposerSendButton>
        <StyledTooltipContent>
          Send
          <Tooltip.Arrow />
        </StyledTooltipContent>
      </Tooltip.Root>
    </div>
  );
}

const StyledThread = styled('div', {
  backgroundColor: '$background',
  borderRadius: '11px',
  padding: 0,
  boxShadow: '0 6px 11px rgba(0, 0, 0, 0.1)',
  maxWidth: '286px',
  gap: 0,
  display: 'flex',
  flexDirection: 'column',

  variants: {
    hasComments: {
      true: {
        minHeight: '320px',
      },
    },
  },
});

const StyledCommentList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  maxHeight: '308px',
  padding: '0px 0px',
});

const StyledThreadHeader = styled('div', {
  height: 40,
  borderBottom: '1px solid $gray200',
  display: 'flex',
  gap: 0,
  padding: '3px 3px',
  alignItems: 'center',
});

const StyledMessage = styled('div', {
  width: 'calc(100% - 36px)',
  color: sand.sand12,
});

const StyledIconButton = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 22,
  height: 32,
  width: 32,

  '&:hover': {
    background: '$gray200',
    cursor: 'pointer',
  },
});

const StyledTooltipTrigger = styled(Tooltip.Trigger, {
  background: 'none',
  border: 'none',
  padding: '0px',
});

const StyledTooltipContent = styled(Tooltip.Content, {
  borderRadius: '6px',
  padding: '3px 6px',
  fontSize: 13,
  lineHeight: '22px',
  color: 'white',
  backgroundColor: 'black',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 5.5px 16.5px -10px, hsl(206 22% 7% / 20%) 0px 5.5px 11px -15px',

  '&[data-align="start"][data-side="bottom"]': {
    borderTopLeftRadius: 0,
  },

  '&[data-align="start"][data-side="top"]': {
    borderBottomLeftRadius: 0,
  },

  '&[data-align="end"][data-side="bottom"]': {
    borderTopRightRadius: 0,
  },

  '&[data-align="end"][data-side="top"]': {
    borderBottomRightRadius: 0,
  },
});

function IconButton(props: { children: React.ReactNode; tooltip: string }) {
  return (
    <Tooltip.Root>
      <StyledTooltipTrigger>
        <StyledIconButton>{props.children}</StyledIconButton>
      </StyledTooltipTrigger>
      <StyledTooltipContent>
        {props.tooltip}
        <Tooltip.Arrow />
      </StyledTooltipContent>
    </Tooltip.Root>
  );
}

const StyledHeaderLeftGroup = styled('div', {
  display: 'flex',
  flexGrow: 1,
  gap: 0,
});

function Thread(props: {
  onCommentSend: (message: string) => void;
  thread: Readonly<CommentThread>;
}) {
  const hasComments = props.thread.comments.length > 0;

  return (
    <StyledThread>
      <IconContext.Provider value={{ size: '20px' }}>
        {hasComments && (
          <StyledThreadHeader>
            <StyledHeaderLeftGroup>
              <IconButton tooltip="Previous Comment">
                <ArrowLeft />
              </IconButton>
              <IconButton tooltip="Next Comment">
                <ArrowRight />
              </IconButton>
            </StyledHeaderLeftGroup>
            <IconButton tooltip="Mark as done">
              <CheckCircle />
            </IconButton>
            <IconButton tooltip="Close">
              <X />
            </IconButton>
          </StyledThreadHeader>
        )}
        {hasComments && (
          <StyledCommentList>
            <StyledScrollArea>
              <StyledViewport css={{ backgroundColor: 'white' }}>
                {props.thread.comments.map((comment) => (
                  <Comment message={comment.message} actor={props.thread.actors[comment.actorId]} />
                ))}
              </StyledViewport>
              <StyledScrollbar orientation="vertical">
                <StyledThumb />
              </StyledScrollbar>
              <StyledCorner />
            </StyledScrollArea>
          </StyledCommentList>
        )}
        <Composer onCommentSend={props.onCommentSend} isFloating={!hasComments} />
      </IconContext.Provider>
    </StyledThread>
  );
}

const StyledCollabKit = styled('div', {
  fontFamily: 'apple-system, BlinkMacSystemFont, sans-serif',
});

const StyledFace = styled('img', {
  borderRadius: 100,
  width: 32,
  height: 32,
});

function Face(props: { url: string }) {
  return <StyledFace src={props.url} />;
}

const StyledCommentIndicator = styled('div', {
  borderRadius: '22px 22px 22px 1px',
  padding: 11,
  boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 6px 11px rgba(0, 0, 0, 0.1)',
  backgroundColor: ACCENT,
  display: 'inline-flex',
  gap: 6,
});

function CommentIndicator(props: { thread: CommentThread }) {
  const photoURLs = Object.keys(props.thread.actors).map(
    (actorId) => props.thread.actors[actorId].photoURL
  );
  return (
    <StyledCommentIndicator>
      {photoURLs.map((url) => (
        <Face key={url} url={url} />
      ))}
    </StyledCommentIndicator>
  );
}

function CommentIcon() {
  return (
    <ChatTeardrop
      size={40}
      color={ACCENT}
      weight={'fill'}
      style={{
        filter: `drop-shadow(0px 6px 11px rgba(0, 0, 0, 0.1)) 
                 drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.1))`,
      }}
    />
  );
}

function CollabKit() {
  const { threads } = useSnapshot(store);

  return (
    <Tooltip.Provider>
      <StyledCollabKit>
        <br />
        <HInfo>Thread With Comments</HInfo>
        <Thread thread={threads['thread-1'] as any} onCommentSend={events.onCommentSend} />
        <br />
        <HInfo>New Thread</HInfo>
        <Thread thread={threads['thread-2'] as any} onCommentSend={events.onCommentSend} />
        <br />
        <HInfo>Floating Comment button</HInfo>
        <FloatingCommentButton />
        <br />
        <HInfo>Comment Icon</HInfo>
        <CommentIcon />
        <br />
        <HInfo>Comment Indicator</HInfo>
        <CommentIndicator thread={store.threads['thread-1']} />
      </StyledCollabKit>
    </Tooltip.Provider>
  );
}

function HInfo(props: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        padding: 11,
        textTransform: 'uppercase',
        fontSize: 14,
        lineHeight: '24px',
        color: 'gray',
      }}
    >
      {props.children}
    </h1>
  );
}

function CommentPrototype() {
  const { uiState } = useSnapshot(store);

  return (
    <div>
      <img
        data-commentable="true"
        data-commentable-id="https://66.media.tumblr.com/24574d8a8f86466ddef280cb13442692/bd7201747b26c550-e1/s540x810/601b02f3f992dd20cac8598a5b66ed0ef3d993f9.gif"
        style={{ width: 400 }}
        src="https://66.media.tumblr.com/24574d8a8f86466ddef280cb13442692/bd7201747b26c550-e1/s540x810/601b02f3f992dd20cac8598a5b66ed0ef3d993f9.gif"
      />
      <img
        data-commentable="true"
        data-commentable-id="https://66.media.tumblr.com/7dd49c8b17fc9d2c2ac9d0352523eb55/tumblr_o2ayekYBiz1upvbufo1_r3_540.gif"
        style={{ width: 400 }}
        src="https://66.media.tumblr.com/7dd49c8b17fc9d2c2ac9d0352523eb55/tumblr_o2ayekYBiz1upvbufo1_r3_540.gif"
      />
      <br />
      <br />
      <div style={{ display: 'flex', gap: '10px' }}>
        {uiState === 'selecting' && 'Select an image to comment on it'}
        <button onClick={() => events.onFloatingCommentButtonClick()}>
          {store.uiState === 'selecting' ? 'Cancel' : 'Comment'}
        </button>
      </div>
      <style>
        {`.commentable-hover {
          border: 2px solid red;
        }
        .commentable-selected {
          border: 2px solid green;
        }`}
      </style>
    </div>
  );
}

export function CollabKitPlayground() {
  return (
    <div style={{ padding: 22 }}>
      <h1 style={{ padding: 11, paddingBottom: 0 }}>CollabKit</h1>
      <CollabKit />
      <br />
      <HInfo>Prototype</HInfo>
      <CommentPrototype />
    </div>
  );
}
