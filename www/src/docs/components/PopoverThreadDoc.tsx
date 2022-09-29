import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { PopoverThreadDemo } from './PopoverThreadDemo';

export function PopoverThreadDoc() {
  return (
    <>
      <H2>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </H2>
      <PopoverThreadDemo />
      <div>
        <H3>Usage</H3>
        {renderCodeSnippet(`import { } from '@collabkit/react'`)}
      </div>
    </>
  );
}
