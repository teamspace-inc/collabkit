import { H2, H3 } from '../UIKit';
import { DocDemoContainer } from './Doc';

export function WorkspacesDoc() {
  return (
    <>
      <H2>
        Workspaces map to your users team or company. They are privacy &amp; visibility containers.
      </H2>
      <div>
        <DocDemoContainer>illustration showing the concept of workspaces</DocDemoContainer>
      </div>
      <div>
        <H3>Mental model</H3>
        <p>
          Workspaces group comment threads by team/company name. e.g. if some of our users belong to
          the company ACME.
        </p>
        <p>
          When you provide user information to CollabKit, you should also provide their associated
          Workspace.
        </p>
        <p>
          Note: if you do not have the concept of Workspaces, Teams or Companies in your product,
          and instead want to provide commenting, you should follow our Workspace-Less guide.
        </p>
      </div>
      <div>
        <H3>Notifications</H3>
        <p>
          Users in the same Workspace will be notified about new comment threads created in that
          Workspace.
        </p>
      </div>
      <H3>Usage</H3>
      <p></p>
    </>
  );
}
