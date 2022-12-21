import { DocFooterLink } from './Doc';

// While apps like Slack and Microsoft Teams are where we chat they don’t really enable communication around a piece of content in your product well. People resort to taking screenshots and sharing them on other services, while describing the relevant context manually “See the fourth item from the top in this list”.

export function IntroductionDoc() {
  return (
    <>
      <h2>
        Add collaboration to your app with our customisable React SDK. In minutes your users will be
        able to work as a team within your app.
      </h2>
      <DocFooterLink
        path={['Getting Started']}
        style={{ alignItems: 'flex-start' }}
        direction="next"
      />
      <div>
        <h3>Vision</h3>
        <p>
          Collaboration is a vital part of most SaaS apps, but building a high-quality commenting
          system can be a major undertaking. That's where we come in. Our goal is to create a
          top-notch, easy-to-integrate commenting system that helps your users collaborate
          effectively within your product. That way, you can focus on your core value and meet your
          users' expectations with minimal effort.
        </p>
      </div>
      <div>
        <h3>Key Features</h3>
        <ol>
          <li>
            <p>
              <b>Contextual Collaboration: </b>
              Comment on anything in your app.
            </p>
          </li>
          <li>
            <p>
              <b>Easy to integrate: </b> Drop-in our SDK and ship collaboration in minutes.
            </p>
          </li>
          <li>
            <p>
              <b>Customisable: </b>
              Match your app's look and feel
            </p>
          </li>
          <li>
            <p>
              <b>Human: </b>
              Emojis, GIFs, file sharing, and replies make collaboration feel like home
            </p>
          </li>
        </ol>
      </div>
    </>
  );
}
