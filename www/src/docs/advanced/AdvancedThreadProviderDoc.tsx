import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';
import { AdvancedProps } from './AdvancedCommon';

export function AdvancedThreadProviderDoc() {
  return (
    <>
      <h2>Provides thread context for other components</h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Advanced</h4>
        This doc covers how to set up context for rendering individual Comment or Profile
        components. In most cases you'll want to use a higher level component like{' '}
        <DocLink href="/docs/components/thread">Thread</DocLink>.
      </blockquote>

      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKitProvider</code>
        </p>
        {renderCodeSnippet(`import { Thread, Comment } from '@collabkit/react';

export const SomeComponent() {
  return <Thread.Provider threadId="replace-with-thread-id">
    <Comment.Root>
      <Comment.Body />
    </Comment.Root>
  </Thread.Provider>
}`)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'threadId',
              'string',
              <>
                The <code>threadId</code> of the thread to provide context for.
              </>,
            ],
          ]}
        />
      </div>
    </>
  );
}
