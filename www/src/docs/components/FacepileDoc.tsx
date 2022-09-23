import { Doc } from '../Doc';
import { Markdown } from '../Markdown';

export function FacepileDoc() {
  return (
    <Doc title="Facepile">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>Displays a facepile of user avatars.</p>
      <Markdown
        body={`### Demo

→ Live demo of an facepile with 1 avatar.

→ The above but for 2, 3 and 8 avatars. 

### Usage

### Props

### size?: number

Adjusts the size of the avatar`}
      />
    </Doc>
  );
}
