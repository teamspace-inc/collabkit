import { Doc } from '../Doc';
import { Markdown } from '../Markdown';

export function TableViewsDoc() {
  return (
    <Doc title={'Table Views'}>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        For tables, data grids and spreadsheet-like interfaces.
      </p>
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
    </Doc>
  );
}
