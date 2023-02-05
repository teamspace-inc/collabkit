import { renderCodeSnippet } from '../../CodeEditor';
import { DocLink } from '../../Doc';
import Anatomy from './CommentAnatomy.tsx?raw';
import Usage from './CommentUsage.tsx?raw';
import {
  AdvancedDisclaimer,
  AdvancedHeroDemo,
  AdvancedPart,
  AdvancedProps,
} from '../AdvancedCommon';
import { Comment, Thread } from '@collabkit/react';
import React from 'react';

const commentContainer: React.CSSProperties = {
  width: '100%',
  // background: vars.color.bgContrastMedium,
};

function CommentDemo(props: { children?: React.ReactNode }) {
  return (
    <Thread.Provider threadId="thread3">
      <div style={commentContainer}>
        <Comment.Root commentId="event1">{props.children}</Comment.Root>
      </div>
    </Thread.Provider>
  );
}

export function CommentDoc() {
  return (
    <>
      <h2>Render a comment</h2>
      <AdvancedDisclaimer componentName="Comment" />

      <div>
        <h3>Demo</h3>
        <AdvancedHeroDemo>
          <Thread.Provider threadId="thread3">
            <div style={{ ...commentContainer }}>
              <Comment commentId="event1" />
            </div>
          </Thread.Provider>
        </AdvancedHeroDemo>
      </div>

      <div>
        <h3>Usage</h3>
        <p>Renders a Comment. The most basic usage is as follows.</p>
        {renderCodeSnippet(Usage)}
        <p>
          You must render <code className="ReactNode">Comment</code> inside a{' '}
          <code className="ReactNode">Thread.Provider</code> so it knows which thread the{' '}
          <code>commentId</code> is in.{' '}
        </p>
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            ['commentId', 'string', <>The id of the comment.</>],
            [
              'className',
              'string | undefined',
              <>
                Providing a <code>className</code> will override any default styles and apply your
                own.
              </>,
            ],
          ]}
        />
      </div>

      <div>
        <h3>Anatomy</h3>
        <p>
          Lets look at the parts that make up a <code className="ReactNode">{'<Comment />'}</code>.
        </p>
        {renderCodeSnippet(Anatomy, [[1, 2]])}
        <p>
          You can render just the individual parts too, if you want to just render just the comment
          body. Replace some components with your own custom ones. Or even insert new components in
          between the existing ones you can do so. <br />
          <br />
          Ensure components are be rendererd within an instance of{' '}
          <code className="ReactNode">{'<Comment.Root>'}</code>.
        </p>
      </div>
      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <div>{/* insert components here */}</div>
  </Comment.Root>
</Thread.Provider>);`}
        demo={<CommentDemo />}
        description={
          <>
            The root component of a Comment. Sets up Comment & Profile providers for you. Is
            required to other Comment components further down this list.
            <br />
            Creates <code className="ReactNode">{'<Comment.Provider>'}</code> for the provided{' '}
            <code>commentId</code> and a<code className="ReactNode">{'<Profile.Provider>'}</code>{' '}
            for the comments author for you. <br />
            <br />
            And automatically marks comment as seen when mounted and visible in the browser
            viewport.
          </>
        }
        title={'Comment.Root'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
      <Comment.CreatorAvatar />
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.CreatorAvatar />
          </CommentDemo>
        }
        description={<>A component that renders the comment creator's avatar.</>}
        title={'Comment.CreatorAvatar'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <Comment.Header>
      <Comment.CreatorName />
      <Comment.Timestamp />
    </Comment.Header>
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.Header>
              <Comment.CreatorName />
              <Comment.Timestamp />
            </Comment.Header>
          </CommentDemo>
        }
        description={
          <>
            A convenience component that lays out the comment creator's name and the comment
            timestamp horizontally.
          </>
        }
        title={'Comment.Header'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <Comment.CreatorName />
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.CreatorName />
          </CommentDemo>
        }
        description={
          <>
            Renders the comment creator's name using{' '}
            <DocLink href="/docs/profile">
              <code className="ReactNode">{'<Profile.Name>'}</code>
            </DocLink>
          </>
        }
        title={'Comment.CreatorName'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <Comment.Timestamp />
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.Timestamp />
          </CommentDemo>
        }
        description={<>Renders the comment creation timestamp.</>}
        title={'Comment.Timestamp'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <Comment.Actions />
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.Actions />
          </CommentDemo>
        }
        description={
          <>
            Renders the actions that can be taken on a comment. <br />
            <br />
            This includes the ability to edit, delete or resolve the comment's thread (if is the
            first comment, and the authenticated user is the comment's author).
          </>
        }
        title={'Comment.Actions'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <Comment.Body />
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.Body />
          </CommentDemo>
        }
        description={
          <>
            Renders the comment body. <br />
            <br />
            Including mentions, links and rich-text in markdown.
          </>
        }
        title={'Comment.Body'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

export default () => (<Thread.Provider threadId="thread1">
  <Comment.Root commentId="event1">
    <Comment.MoreMenu>
  </Comment.Root>
</Thread.Provider>);`}
        demo={
          <CommentDemo>
            <Comment.MoreMenu />
          </CommentDemo>
        }
        description={
          <>
            Renders Resolve, Edit, Delete and other actions the authenticated user can take. <br />
            <br />
            All actions apart from the first one are rolled up into a '3 dots' more menu.
            <br />
            <br />
            Actions that are not allowed for the authenticated user are not displayed. Ex. You will
            only see Edit and Delete in the menu for comments you have authored.
            <br />
          </>
        }
        title={'Comment.MoreMenu'}
      />
    </>
  );
}
