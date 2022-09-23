import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { PopoverThreadDemo } from './PopoverThreadDemo';

export function PopoverThreadDoc() {
  return (
    <div>
      <H2>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </H2>
      <H3>Demo</H3>
      <PopoverThreadDemo />
      <H3>Usage</H3>
      {renderCodeSnippet(`import { } from '@collabkit/react'`)}
    </div>
  );
}
