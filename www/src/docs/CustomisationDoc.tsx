import { renderCodeSnippet } from './CodeEditor';
import { Doc } from './Doc';

export function CustomisationDoc() {
  return (
    <div>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Customise the look and feel of CollabKit to entirely match you apps UI.
      </p>
      <p>
        Adjust style variables to change colours, typography, spacing, padding, margins and more.
      </p>
      <blockquote>
        Note: If you want to completely customise CollabKit, have a look at the @Advanced
        Customisation API. It makes it possible to consume, recombine and replace the individual
        components that make up a Thread, Popover Thread or Inbox. You can use it to create entirely
        new commenting or collaboration experiences.
      </blockquote>
      <h3>Demo</h3>
      <h3>Usage</h3>
      {renderCodeSnippet(`import type { CustomTheme } from '@collabkit/react';
import { Provider } from '@collabkit/react';

const theme: CustomTheme = {
	colors: {
    buttonPrimaryBackground: '#36B374',
  }
}

<Provider theme={theme} />`)}
    </div>
  );
}
