import { Markdown } from '../Markdown';

export function ListViewsDoc() {
  return (
    <div>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        For lists of things in your product. Ex. a list of customers, sales, tasks, different
        entities in your product.
      </p>
      <Markdown
        body={`
### Examples

→ Show a mock of a Popover Thread & Comment Button on a list on a page.

→ Show the above across a variety of interfaces and themes applied, so it looks like it works across any product.

### Components Used

1. Comment Button
2. Popover Thread`}
      />
    </div>
  );
}
