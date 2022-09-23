import { renderCodeSnippet } from '../CodeEditor';
import { PopoverThreadDemo } from './PopoverThreadDemo';

export function PopoverThreadDoc() {
  return (
    <div>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </p>
      <h3>Demo</h3>
      <PopoverThreadDemo />
      <h3>Usage</h3>
      {renderCodeSnippet(`import { } from '@collabkit/react'`)}
    </div>
  );
}
