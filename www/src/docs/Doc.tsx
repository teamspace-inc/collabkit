import { useWindowSize } from '../hooks/useWindowSize';

import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';
import { Nav } from './Nav';

const DocRoot = styled('div', {
  wordWrap: 'break-word',
  display: 'grid',
  gridTemplateColumns: '264px 1fr',
});

const DocNav = styled(Nav, {
  position: 'sticky',
  top: 0,
  height: '100vh',
});

const DocContent = styled('div', {
  wordWrap: 'break-word',
  flex: 1,
  padding: 20,
  boxSizing: 'border-box',

  blockquote: {
    borderLeft: '2px solid black',
    textIndent: 0,
    paddingLeft: 20,
    marginLeft: 0,
  },

  h1: {
    marginTop: 0,
  },
});

export function Doc(props: {
  title: string;
  children: React.ReactNode;
  demo?: React.ReactNode;
  next: string[] | undefined;
  prev: string[] | undefined;
}) {
  const size = useWindowSize();
  return (
    <DocRoot>
      <DocNav />
      <DocContent>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '80px 1fr',
            background: 'blue',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid black',
              // position: 'fixed',
              background: 'white',
              // left: 264,
              // right: 0,
              // top: 0,
              // height: 64.5,
              padding: 20,
              boxSizing: 'border-box',
              margin: 0,
            }}
          >
            <h1 style={{ display: 'block', margin: 0, padding: 0, lineHeight: '24px' }}>
              {props.title}
            </h1>
          </div>

          <div>
            <ScrollAreaRoot>
              <ScrollAreaViewport>
                <div style={{ paddingRight: '20px' }}>{props.children}</div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="vertical">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollAreaRoot>
          </div>
          <div
            style={{
              // position: 'fixed',
              // bottom: 0,
              // height: 64.5,
              // left: 264,
              // right: 0,
              borderTop: '1px solid black',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                // height: 64.5,
                flex: 1,
                alignItems: 'center',
                display: 'flex',
                padding: '0px',
                // border: '1px solid black',
                borderRadius: '6px',
              }}
            >
              <div style={{ flex: 1, padding: '0 20px', display: 'flex' }}>
                <span style={{ flex: 1 }}>Next</span>
                <div>{props.next}</div>
              </div>
            </div>
          </div>
        </div>
      </DocContent>
    </DocRoot>
  );
}
