import { H2 } from '../../UIKit';
import { DocDemoContainer } from '../Doc';
import { Markdown } from '../Markdown';

export function TableViewsDoc() {
  return (
    <div>
      <H2>For tables, data grids and spreadsheet-like interfaces.</H2>
      <DocDemoContainer />
      <Markdown
        body={`
### Examples

→ Show a mock of a table with a user commenting on it

→ All of the above should have different themes applied, be working examples, and highlight features relevant to table cell commenting, i.e. resolving a comment.

→ Show a mock of the inbox open, showing multiple comments across table cells. With the context of the  

### Components Used

1. Popover Thread
2. Inbox`}
      />
    </div>
  );
}
