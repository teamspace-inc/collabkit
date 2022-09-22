import { Outline, DocNode } from '../docs/Outline';
// import { getOutline, OUTLINE, store } from '../docs/store';
import { useSnapshot } from 'valtio';
// import has from 'has';
import { useLocation } from 'wouter';

// function DocsLink(props: { path: string; children: React.ReactNode }) {
//   return <a href={`docs/${props.path}`}>{props.children}</a>;
// }

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

// export function DocsPage() {
//   const [location] = useLocation();
//   const [base, docs, ...path] = location.split('/');
//   const { component } = getRelatedNodes(getOutline(), path);

//   return (
//     <div>
//       <Outline node={OUTLINE} />
//       {component}
//       <Prev />
//       <Next />
//     </div>
//   );
// }
