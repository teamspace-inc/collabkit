import { CollabKit } from '@collabkit/react';
import { useEffect } from 'react';
import { tomato, blue } from '@radix-ui/colors';
import { Center, Grid } from './Dashboard';

export function Preview(props: { appId: string; apiKey: string; mode: 'SECURED' | 'UNSECURED' }) {
  useEffect(() => {
    CollabKit.setup(props);
    CollabKit.identify({
      workspaceId: 'acme',
      userId: 'user1',
      workspaceName: 'ACME',
      name: 'Namit',
      email: 'namit@useteamspace.com',
      avatar: 'namit.pic.jpg',
    });
  }, [props.apiKey, props.mode, props.appId]);

  return (
    <div style={{ padding: '2rem', background: '#eee', borderRadius: '20px' }}>
      <CollabKit.Debug />
      <CollabKit.App token={props.apiKey}>
        <CollabKit.Workspace workspaceId="acme">
          {/* <h1>CRM</h1>
          <h1>Recent Sales</h1>
          <ul>
            <li>
              <div>Tempest Tires</div>
            </li>
            <li>
              <div>Discount Suit Company</div>
            </li>
            <li>
              <div></div>
            </li>
            <li></li>
            <li></li>
            <li></li>
          </ul> */}
          <Grid layout="col2">
            <div>
              <Center>
                <div>
                  <br />
                  <code>Component</code>
                  <br />
                  <h1>Comment Thread</h1>
                  <p>
                    Add a comment thread inline, great for product, invoice, sales or customer
                    detail views.
                  </p>
                </div>
              </Center>
            </div>
            <div>
              <Center>
                <div
                  style={{
                    background: 'white',
                    width: 400,
                    borderRadius: '6px',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div
                    style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      position: 'relative',
                    }}
                  >
                    <h1>Invoice</h1>
                    <div
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        position: 'absolute',
                        right: 16,
                        top: 12,
                        fontSize: '1rem',
                        color: blue.blue10,
                      }}
                    >
                      ACME
                    </div>
                    <div style={{ color: tomato.tomato10, fontWeight: 'bold' }}>Due in 4 days</div>
                    <div style={{ fontSize: '2rem' }}>$10,240</div>
                    <p style={{ fontSize: '1rem' }}>
                      Some awesome sales text goes here, and you can use this product for X. Make
                      others get things off the ground, and use to enable Y.
                    </p>
                    <CollabKit.Thread threadId={'customer1'} />
                  </div>
                </div>
              </Center>
            </div>
          </Grid>
          <div>
            <br />
            <code>Component</code>
            <Grid layout="col2">
              <div>
                <br />
                <h1>Comment Button</h1>
                <p>
                  Add a comment button to table rows, or other parts of your UI to let users comment
                  about a particular 'thing'. Like a sale, a customer, or product.
                </p>
              </div>
              <div>
                <CollabKit.Button threadId={'customer1'} />
              </div>
            </Grid>
          </div>
        </CollabKit.Workspace>
      </CollabKit.App>
    </div>
  );
}
