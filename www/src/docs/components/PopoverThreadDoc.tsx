import { renderCodeSnippet } from '../CodeEditor';
import { Doc } from '../Doc';

export function PopoverThreadDoc() {
  return (
    <Doc title="Popover Thread">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </p>

      <h3>Demo</h3>
      <div
        style={{
          background: 'cyan',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Live demo here
      </div>
      <h3>Usage</h3>
      {renderCodeSnippet(`import { } from '@collabkit/react'`)}
    </Doc>
  );
}
