import { AdvancedProps } from '../../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../../CodeEditor';
import { DocLink } from '../../Doc';
import Usage from './UsePopoverUsage.tsx?raw';

export function UsePopoverThreadDoc() {
  return (
    <>
      <h2>State and actions for a PopoverThread.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          <code>usePopoverThread</code> lets you manage the state of a{' '}
          <DocLink to="/docs/components/popoverthread">PopoverThread</DocLink>. It's main purpose is
          to let you show the popover when user takes some action in your product by calling the{' '}
          <code>showThread()</code> and <code>hideThread()</code> actions it returns.
        </p>
        <p>
          To use <code>usePopoverThread</code> pass an <code>objectId</code> which maps to the
          underlying ID of an object in your product. Note it must be the same <code>objectId</code>{' '}
          that you pass to the <DocLink to="/docs/components/popoverthread">PopoverThread</DocLink>{' '}
          component.
        </p>
        <p>
          The following code shows how you can use <code>usePopoverThread</code>
        </p>
        {renderCodeSnippet(Usage)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            ['objectId', 'string', 'A unique ID that represents the object in your product.'],
          ]}
        />
        <br />
        <h3>Returns</h3>
        <AdvancedProps
          props={[
            ['showThread', `() => void`, 'Opens the thread popover.'],
            ['hideThread', `() => void`, 'Closes the thread popover.'],
            ['threadVisible', `boolean`, 'Whether the thread popover is open or not.'],
            ['showPreview', `() => void`, 'Opens the preview popover.'],
            ['hidePreview', `() => void`, 'Closes the preview popover.'],
            ['previewVisible', `boolean`, 'Whether the preview popover is open or not.'],
            ['hasThread', `boolean`, 'Whether there is an open comment thread for this objectId.'],
          ]}
        />
      </div>
    </>
  );
}
