import { Doc } from './Doc';
import { Markdown } from './Markdown';

export function AdvancedCustomisationDoc() {
  return (
    <div>
      <Markdown
        body={`[ later ]

1. Building blocks
2. Applying styles
3. Adding your content
4. Building entirely new experiences
5. Library specific guides 
    1. Tailwind
    2. Chakra
    3. Styled components or and other CSS-in-JS systems`}
      />
    </div>
  );
}
