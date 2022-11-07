import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { DocHeroDemoContainer } from '../Doc';
import { PopoverDemo } from './PopoverDemo';
import Usage from './PopoverUsage.tsx?raw';

export function PopoverThreadDoc() {
  return (
    <>
      <h2>A popover comment thread that can anchor to any component in your app.</h2>
      <DocHeroDemoContainer style={{ padding: '100px 20px 280px' }}>
        <PopoverDemo />
      </DocHeroDemoContainer>

      <div>
        <h3>Usage</h3>
        <p>
          To add a popover thread to a component in your app. Wrap the component with{' '}
          <code>{'<PopoverThread />'}</code> and pass an <code>objectId</code> as a prop. <br />
          <br />
          Object IDs are your stable unique identifiers for an object in your product. Ex. for a CRM
          it may be a customer's ID or for a task management app it may be a task ID.
          <br />
          <br />
          Once you've wrapped your component in <code>{'<PopoverThread />'}</code> you need to then
          call the associated <code>{'usePopoverThread'}</code> hook with the same object ID to get
          the popover thread's state and actions.
          <br />
          <br />
          The main action you'll need to use is <code>{'openPopover()'}</code>. This will open the
          comment thread popover for you. We recommend binding this to the <code>onClick</code>{' '}
          event of your component, a context menu, or another button in your product. This vary's
          based on your use case.
          <br />
          <br />
          The following code sample shows how to put it all together:
        </p>
        {renderCodeSnippet(Usage)}
      </div>
      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'objectId',
              'string',
              'A unique ID that represents the object you want to attach the popover thread to.',
            ],
            [
              'children',
              'React.ReactNode',
              'The component you want to attach the popover thread to.',
            ],
          ]}
          optionalProps={[
            [
              'objectName',
              'string | undefined',
              'A name for the object. Used in email notifications to refer to the object.',
            ],
          ]}
        />
      </div>
    </>
  );
}
