import { vars } from '../../styles/Theme.css';
import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer } from '../Doc';
import { PopoverDemo } from './PopoverDemo';
import Usage from './PopoverUsage.tsx?raw';
import { ThreadProps } from './ThreadDoc';

export function PopoverThreadDoc() {
  return (
    <>
      <h2>A popover comment thread that can anchor to any component in your app.</h2>
      <DocDemoContainer style={{ padding: '100px 20px 280px', background: vars.color.purple }}>
        <PopoverDemo />
      </DocDemoContainer>

      <div>
        <h3>Usage</h3>
        <p>
          Wrap a component with <code>{'<Popover />'}</code> in order to create a popover thread
          that appears automatically appears on hover.
          <br />
          <br />
          The popover appears on click and disappears on click outside automatically. Or by pressing{' '}
          the <code>Escape</code> key.
          <br />
          <br />
          Show and hide the popover thread using <code>usePopoverState</code>.
        </p>
        {renderCodeSnippet(Usage)}
      </div>
      <div>
        <h3>Props</h3>
        <AdvancedProps rows={ThreadProps} />
      </div>
    </>
  );
}

// const ref  = usePopoverAnchor({ objectId: 'cellA12' });
// <>
//   <Popover.Thread objectId="cellA12" name="Q4 P&L">

//   </Popover.Thread>
//   <Popover.Preview objectId="cellA12" name="Q4 P&L">

//     </Popover.Preview>
// </>
