import { CurrentUser } from './CurrentUser';
import { AppList } from './Apps';
import { HStack, Spacer } from './UIKit';

function HowItWorks() {
  return <div>How It Works</div>;
}

function Integrate() {
  return <div>Integrate</div>;
}

function Pricing() {
  return <div>Pricing Page</div>;
}

function DetailedWhy() {
  return (
    <div>
      <p>
        Collaboration is the underlying activity driving most workflows and product use for work.
        Stop losing engagement to other products and bring it on platform to drive engagement,
        retention &amp; growth.
      </p>
      {/* <p>
        <b>Contextual collaboration</b>
      </p> */}
      <p>
        If you have 2+ people from the same team or company using your product, adding commenting
        lets them collaborate in your product instead of switching over to Slack, Microsoft Teams or
        Email.
      </p>
    </div>
  );
}

export function Dashboard() {
  return (
    <div>
      <div style={{ padding: '2rem 2rem 0' }}>
        <HStack>
          <b style={{ fontSize: 20, fontWeight: 500 }}>CollabKit</b>
          <Spacer />
          <CurrentUser />
        </HStack>
      </div>

      {/* <Hero /> */}
      <AppList />
      {/* <HowItWorks /> */}
      {/* <DetailedWhy /> */}
      {/* <Integrate /> */}
      {/* <Pricing /> */}

      {/* <p>
        <b>Public discussions</b>
      </p>
      <p>
        If you have public content, like a video, photo or document. Adding public commenting lets
        others discuss in your product.
      </p>
      <p>
        <b>Feedback on content</b>
      </p>
      <p>
        If your users are creating content in your product. Comments enables others to provide
        feedback in context on work in progress.
      </p> */}
    </div>
  );
}
