import { Doc } from '../Doc';
import { Markdown } from '../Markdown';

export function DetailViewsDoc() {
  return (
    <Doc title={'Detail Views'}>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Add a comment thread to views in your product about a single object. Ex. For a CRM it would
        be a customer, for a task management app it would be a task.
      </p>
      <Markdown
        body={`
          
  ### Examples
  
  → Show a mock of a comment thread on a modal with a chart
  
  → Show a mock of a comment thread on a task (like in Dart) 
  
  → Show a mock of a comment thread on an image
  
  → All of the above should have different themes applied, be working examples, and highlight rich features like emojis, reactions, replies, and nested commenting (with each example covering a different set as is appropriate)
  
  ### Components Used
  
  1. Thread`}
      />
    </Doc>
  );
}
