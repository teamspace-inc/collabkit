import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { Markdown } from '../Markdown';
import ThreadMarkdown from '../markdown/Thread.md?raw';
import { ThreadDemo } from './ThreadDemo';

export function ThreadDoc() {
  return (
    <>
      <H2>A comment thread that lets users talk to each other.</H2>
      <ThreadDemo />
      <div>
        <H3>Usage</H3>
        {renderCodeSnippet(`import { Thread } from '@collabkit/react';

<Thread threadId={'my-thread-id'} />`)}
      </div>
      <div>
        <H3>Props</H3>
        <Markdown body={ThreadMarkdown} />
      </div>
    </>
  );
}
