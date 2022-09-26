import { H2 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { Markdown } from '../Markdown';
import ThreadMarkdown from '../markdown/Thread.md?raw';
import { ThreadDemo } from './ThreadDemo';

export function ThreadDoc() {
  return (
    <div>
      <H2>A comment thread that lets users talk to each other.</H2>
      <h3>Demo</h3>
      <ThreadDemo />
      <h3>Usage</h3>
      {renderCodeSnippet(`import { Thread } from '@collabkit/react';

<Thread threadId={'my-thread-id'} />`)}
      <div>
        <h3>Props</h3>
        <Markdown body={ThreadMarkdown} />
      </div>
    </div>
  );
}
