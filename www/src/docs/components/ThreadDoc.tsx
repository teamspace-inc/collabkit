import { styled } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { Doc } from '../Doc';
import { Markdown } from '../Markdown';
import ThreadMarkdown from '../markdown/Thread.md?raw';

const StyledMarkdown = styled(Markdown, {
  code: {
    fontFamily: 'Monaco',
    fontSize: 14,
    color: '#a31515',
  },
});

export function ThreadDoc() {
  return (
    <Doc title="Thread">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </p>

      <h3>Usage</h3>
      {renderCodeSnippet(`import { Thread } from '@collabkit/react';

<Thread threadId={'my-thread-id'} />`)}
      <div>
        <h3>Props</h3>
        <StyledMarkdown body={ThreadMarkdown}></StyledMarkdown>
      </div>
    </Doc>
  );
}
