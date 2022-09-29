import { H2, H3 } from '../UIKit';
import { DocCalloutLink } from './Doc';

// While apps like Slack and Microsoft Teams are where we chat they don’t really enable communication around a piece of content in your product well. People resort to taking screenshots and sharing them on other services, while describing the relevant context manually “See the fourth item from the top in this list”.

export function IntroductionDoc() {
  return (
    <>
      <H2>
        CollabKit is a drop-in React &amp; Vue SDK for adding commenting to your app. It's fully
        customisable, can be integrated in minutes, and helps increase engagement.
        <br />
        <br />
        Add our flexible components to your app to help your users collaborate in context.
      </H2>
      <DocCalloutLink href="/docs/gettingstarted">Get started</DocCalloutLink>
      <div>
        <H3>Vision</H3>
        <p>
          Most SaaS apps need some form of collaboration. It’s the underlying activity we perform
          while working with others in a team, and the tools we use have the context about the work
          we’re doing.{' '}
        </p>
        <p>
          Purpose built collaboration apps like Notion, Figma and Google Docs have offered
          commenting for many years now, but for the average app, building one is usually a
          significant undertaking, or one done to a bare-minimum standard which misses users
          expectations set by industry leading products.
        </p>
        <p>
          Our goal is to create a high-quality, easy-to-integrate commenting system, which helps
          your users collaborate effectively, in your product, with full context. So you can focus
          on your core value and meet your users expectations with minimal effort.
        </p>
      </div>
      <div>
        <H3>Key Features</H3>
        <ol>
          <li>
            <p>
              <b>Contextual Collaboration: </b>
              Comment on anything in your app, whether be it a table, chart, piece of text, or a
              sale, invoice, or product. CollabKit works with any interface, letting your users
              leave comments on the item in question.
            </p>
          </li>
          <li>
            <p>
              <b>Easy to integrate: </b> Drop-in our SDK and ship commenting in minutes. We take
              care of all the hard bits like realtime, seen state, email notifications, rich text
              formatting, emojis and more…
            </p>
          </li>
          <li>
            <p>
              <b>Customisable: </b>
              Fully customisable, pick the components that suit your apps interface and adjust the
              theme to set font size, line heights, spacing, padding, margins, typography and
              colours. Match your apps look and feel so it looks like you built it in-house. Or go
              all the way and use our unstyled building blocks to create an entirely new commenting
              or collaboration experience completely integrated with your app.
            </p>
          </li>
          <li>
            <p>
              <b>Human: </b>
              Let your users work as a team in your product. With emojis, GIFs, file and photo
              sharing, and replies your users will feel right at home with our commenting system.
            </p>
          </li>
        </ol>
      </div>
    </>
  );
}
