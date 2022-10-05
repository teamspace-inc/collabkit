import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { PopoverThreadDemo } from './PopoverThreadDemo';

export function PopoverThreadDoc() {
  return (
    <>
      <H2>
        A comment thread displayed in a popover, can be anchored to any component in your view
        hierarchy.
      </H2>
      <PopoverThreadDemo />
      <div>
        <H3>Usage</H3>
        {renderCodeSnippet(`import { } from '@collabkit/react'`)}
      </div>
    </>
  );
}
