import { renderCodeSnippet } from '../../CodeEditor';
import { DocLink } from '../../Doc';

import Anatomy from './CommentAnatomy.tsx?raw';

import Usage from './CommentUsage.tsx?raw';
import { AdvancedDemo, AdvancedDisclaimer, AdvancedPart } from '../AdvancedCommon';

export function CommentDoc() {
  return (
    <>
      <h2>Render a comment</h2>
      <AdvancedDisclaimer componentName="Comment" />

      <div>
        <h3>Demo</h3>
        <AdvancedDemo>{/* <Comment commentId="123" /> */}</AdvancedDemo>
      </div>

      <div>
        <h3>Usage</h3>
        <p>Renders a Comment. The most basic usage is: </p>
        {renderCodeSnippet(Usage)}
        <br />
        <h3>Props</h3>
        <h4>commentId: string</h4>
        <p>
          The the <code>id</code> of the comment.
        </p>
      </div>

      <div>
        <h3>Anatomy</h3>
        <p>
          Lets look at the parts that make up a <code>{'<Comment />'}</code>.
        </p>
        {renderCodeSnippet(Anatomy, [[1, 2]])}
        <p>
          You can render just the individual parts too, if you want to just render just the comment
          body. Replace some components with your own custom ones. Or even insert new components in
          between the existing ones you can do so. <br />
          <br />
          Ensure components are be rendererd within an instance of <code>{'<Comment.Root>'}</code>.
        </p>
      </div>
      <AdvancedPart
        code={'<Comment.Root>{/* render other parts of a comment here */}</Comment.Root>'}
        description={
          <>
            Automatically creates a <code>{'<Comment.Provider>'}</code> for the provided{' '}
            <code>commentId</code> and a<code>{'<Profile.Provider>'}</code> for the comments author
            for you. <br />
            <br />
            Also automatically marks comment as seen when mounted and visible in the browser
            viewport.
          </>
        }
        title={'Comment.Root'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

<Comment.Root commentId="">
  <Comment.Header>
    {/* render the header here */}
  <Comment.Header />
</Comment.Root>`}
        description={
          <>
            A convenience component that renders the header of a comment and lays out children
            horizontally.
          </>
        }
        title={'Comment.Header'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

<Comment.Root commentId="">
  <Comment.Header>
    <Profile.Avatar />
    <Comment.NameAndTimestampWrapper>
    {/* render name and timestamp here */}
    </Comment.NameAndTimestampWrapper>
  <Comment.Header />
</Comment.Root>`}
        description={
          <>
            A convenience component that lays out the comment creator's name and the comment
            timestamp horizontally.
          </>
        }
        title={'Comment.NameAndTimestampWrapper'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

<Comment.Root commentId="">
  <Comment.CreatorName />
</Comment.Root>`}
        description={
          <>
            Renders the comment creator's name using{' '}
            <DocLink href="/docs/profile">
              <code>{'<Profile.Name>'}</code>
            </DocLink>
          </>
        }
        title={'Comment.CreatorName'}
      />

      <AdvancedPart
        code={`import { Comment } from '@collabkit/react';

<Comment.Root commentId="">
  <Comment.Actions />
</Comment.Root>`}
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

<Comment.Root commentId="">
  <Comment.Body />
</Comment.Root>`}
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

<Comment.Root commentId="">
  <Comment.Body />
</Comment.Root>`}
        description={
          <>
            Renders the comment body. <br />
            <br />
            Including mentions, links and rich-text in markdown.
          </>
        }
        title={'Comment.Body'}
      />
    </>
  );
}
