import { useWindowSize } from '../hooks/useWindowSize';

import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  styled,
} from '../UIKit';

const DocRoot = styled('div', {
  position: 'fixed',
  left: '264px',
  top: 0,
  right: 0,
  bottom: 0,
  wordWrap: 'break-word',
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

export function Doc(props: { title: string; children: React.ReactNode; demo?: React.ReactNode }) {
  const size = useWindowSize();

  const columns = props.demo ? ((size?.width ?? 0) > 1024 ? 2 : 1) : 1;

  return (
    <DocRoot columns={columns}>
      <ScrollAreaRoot>
        <ScrollAreaViewport>
          <DocContent>
            <div>
              <h1>{props.title}</h1>
              {props.children}
            </div>
          </DocContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </DocRoot>
  );
}
