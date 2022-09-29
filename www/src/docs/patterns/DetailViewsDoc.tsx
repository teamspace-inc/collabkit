import { H2 } from '../../UIKit';
import { DocDemoContainer } from '../Doc';
import { Markdown } from '../Markdown';

export function DetailViewsDoc() {
  return (
    <>
      <H2>
        Add a comment thread to views in your product about a single object. Ex. For a CRM it would
        be a customer, for a task management app it would be a task.
      </H2>
      <DocDemoContainer></DocDemoContainer>
      <Markdown
        body={`
          
  ### Examples
  
  → Show a mock of a comment thread on a modal with a chart
  
  → Show a mock of a comment thread on a task (like in Dart) 
  
  → Show a mock of a comment thread on an image
  
  → All of the above should have different themes applied, be working examples, and highlight rich features like emojis, reactions, replies, and nested commenting (with each example covering a different set as is appropriate)
  
  ### When to use this pattern

  

  ### Components Used
  
  1. Thread`}
      />
    </>
  );
}
