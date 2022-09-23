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
  position: 'fixed',
  left: '264px',
  top: 0,
  right: 0,
  bottom: 0,
  wordWrap: 'break-word',
});

const DocContent = styled('div', {
  padding: 20,
  maxWidth: 480,
  wordWrap: 'break-word',

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

// function getRelatedNodes(outline: OutlineNode, path: string[] | readonly string[]) {
//   let node = outline;
//   let keys = Object.keys(node);
//   let next = null;
//   let prev = null;

//   for (const key of path) {
//     const index = keys.indexOf(key);
//     next = keys[index + 1] ?? next;
//     prev = keys[index - 1] ?? prev;
//     if (has(node, key)) {
//       if (typeof node[key] === 'function') {
//         // couldn't figure out cast here
//         let component = node[key];
//         return { next, prev, component };
//       }
//       node = node[key];
//       keys = Object.keys(node);
//     }
//   }

//   return { next, prev };
// }

// function Next() {
//   const { path } = useSnapshot(store);
//   const { next } = getRelatedNodes(getOutline(), path);
//   return <div>Next {next}</div>;
// }

// function Prev() {
//   const { path } = useSnapshot(store);
//   const { prev } = getRelatedNodes(getOutline(), path);
//   return <div>Previous {prev}</div>;
// }

export function Doc(props: { title: string; children: React.ReactNode }) {
  return (
    <DocRoot>
      <Nav />
      <ScrollAreaRoot>
        <ScrollAreaViewport>
          <DocContent>
            <h1>{props.title}</h1>
            {props.children}
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
