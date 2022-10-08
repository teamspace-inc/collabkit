import { renderCodeSnippet } from '../CodeEditor';
import { PopoverThreadDemo } from './PopoverThreadDemo';

export function PopoverThreadDoc() {
  return (
    <>
      <h2>A comment thread that anchors to a component in your app.</h2>
      <PopoverThreadDemo />
      <div>
        <h3>Usage</h3>
        {renderCodeSnippet(`import { PopoverTrigger, usePopoverThread } from '@collabkit/react'

function YourComponent(props: { onClick: () => void}) {
  return <div 
    onClick={props.onClick} 
    style={
      { 
        padding: 20, 
        background: 'white',
        cursor: 'pointer'
      }
    }>
    Component
  </div>
}

export function App() {
  const { setPopoverState, context } = usePopoverThread({
    cellId: 'unique-thread-id-here'
    name: 'Name of the thread';
  });

  return <div>
    <PopoverTrigger context={context}>
      <YourComponent onClick={() => setPopoverState('open')} />
    </PopoverTrigger>
  </div>
}
`)}
      </div>
    </>
  );
}
