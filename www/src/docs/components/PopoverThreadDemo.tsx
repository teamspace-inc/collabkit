import { NewPopoverTrigger } from '@collabkit/react';
import { DocDemoContainer } from '../Doc';
import { vars } from '../../styles/Theme.css';

// actions

// don't whitelist them
// can control the interface more easily

// const { actions } = useActions();
// const actions = CollabKit.actions();
// const { actions } = useActions();
// actions.setPopoverThreadState({ objectId, state: 'open' | 'preview' | 'closed });

// popoverState = 'open' | 'preview' | 'closed'
// setPopoverState = (state: 'open' | 'preview' | 'closed') => void

// nice to have / debateable.....
// actions.openPopoverThread({ objectId });
// actions.closePopoverThread({ objectId });

// const store = CollabKit.createStore()

// <CollabKitProvider store={store}>

// store.setPpoverThreadState({ objectId, state: 'open' | 'preview' | 'closed' });

export function PurePopoverThreadDemo() {
  // const { setPopoverState, context } = usePopoverThread({
  //   name: 'test',
  //   cellId: 'thread4',
  //   _viewId: 'demo',
  //   autoFocus: false,
  // });

  // useEffect(() => {
  //   setPopoverState('open');
  // }, []);
  return (
    <div>
      <NewPopoverTrigger cellId="thread4" name="test" _viewId="demo" autoFocus={false}>
        <div
          // onClick={() => setPopoverState('open')}
          style={{
            padding: '10px 20px',
            marginLeft: '-200px',
            width: '120px',
            borderRadius: '6px',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'rgba(0,0,0,0.3)',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Component
        </div>
      </NewPopoverTrigger>
    </div>
  );
}

export function PopoverThreadDemo() {
  return (
    <DocDemoContainer style={{ padding: '100px 20px 240px', background: vars.color.purple }}>
      <PurePopoverThreadDemo />
    </DocDemoContainer>
  );
}
