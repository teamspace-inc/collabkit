import { Markdown } from '../Markdown';
import markdown from './canvas-commenting.md?raw';

export function CanvasCommentingDoc() {
  return <Markdown body={markdown} />;
}
