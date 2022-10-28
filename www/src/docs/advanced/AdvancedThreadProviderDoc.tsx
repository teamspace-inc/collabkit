import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';

export function AdvancedThreadProviderDoc() {
  return (
    <>
      <h2>Provides thread context for other components.</h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Advanced</h4>
        This doc covers how to set up context for rendering individual Comment or Profile
        components. In most cases you'll want to use a higher level component like{' '}
        <DocLink href="/docs/components/thread">Thread</DocLink> or{' '}
        <DocLink href="/docs/components/popoverthread">PopoverThread</DocLink> directly.
      </blockquote>

      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKitProvider</code>
        </p>
        {renderCodeSnippet(`import { ThreadProvider, Comment } from '@collabkit/react';

export const SomeComponent() {
  return <ThreadProvider threadId="replace-with-thread-id">
    <Comment.Root>
      <Comment.Body />
    </Comment.Root>
  </ThreadProvider>
}`)}
      </div>
      <div>
        <h3>Props</h3>
        <h4>threadId: string</h4>
        <p>
          The <code>threadId</code> of the thread to provide context for.
        </p>
      </div>
    </>
  );
}
