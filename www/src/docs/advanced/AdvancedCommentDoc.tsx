import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';

export function AdvancedCommentDoc() {
  return (
    <>
      <h2>Render a Comment, or one of it's parts</h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Advanced</h4>
        This doc covers how to render an individual Comment. In most cases you'll want to use a
        higher level component like <DocLink href="/docs/components/thread">Thread</DocLink> or{' '}
        <DocLink href="/docs/components/popoverthread">PopoverThread</DocLink> directly.
      </blockquote>

      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { Comment, ThreadProvider } from '@collabkit/react';

export const SomeComponent() {
  return <ThreadProvider threadId="replace-with-thread-id">
    <Comment.Root eventId="replace-with-comment-id">
      <Comment.CreatorName />
      <Comment.Body />
      <Comment.Timestamp />
    </Comment.Root>
  </ThreadProvider>
}`)}
      </div>
      <div>
        <h3>Styling</h3>
        <p>
          CollabKit styles are applied by default. Including any customisation defined in your
          theme. <br />
          To override the default styles, you can pass a <code>className</code> prop to desired
          component.
        </p>
      </div>
    </>
  );
}
