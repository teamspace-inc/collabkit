import { Doc } from './Doc';
import { Markdown } from './Markdown';
import ConceptsMd from './markdown/Concepts.md?raw';

export function ConceptsDoc() {
  return (
    <Doc title="Concepts">
      <Markdown body={ConceptsMd} />
    </Doc>
  );
}
