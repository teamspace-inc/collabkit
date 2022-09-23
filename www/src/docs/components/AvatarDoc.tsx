import { Doc } from '../Doc';

export function AvatarDoc() {
  return (
    <Doc title="Avatar">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>Avatar</p>I think we should add
      CollabKitProvider to components section for completeness. It can also include more detailed
      explanation on why it should be placed in the app root component (people tend to ask about
      this, it seems) and how other components must be used inside it.
    </Doc>
  );
}
