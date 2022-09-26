import { Markdown } from './Markdown';
import ConceptsMd from './markdown/Concepts.md?raw';

export function ConceptsDoc() {
  return (
    <div>
      <Markdown body={ConceptsMd} />
    </div>
  );
}
