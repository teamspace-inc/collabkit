import { Link } from 'wouter';
import { DocCalloutLink, Doc, DocLink } from './Doc';
import { Markdown } from './Markdown';

export function IntroductionDoc() {
  return (
    <div>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        CollabKit is a drop-in React &amp; Vue SDK for adding commenting to your app. It's fully
        customisable, can be integrated in minutes, and helps increase engagement.
        <br />
        <br />
        Add our flexible components to your app to help your users collaborate in context.
      </p>
      <div>
        <DocCalloutLink href="/docs/gettingstarted">Get started</DocCalloutLink>
      </div>
      <Markdown
        body={`### Vision

Most SaaS apps need some form of collaboration. It’s the underlying activity we perform while working with others in a team, and the tools we use have the context about the work we’re doing. 

While apps like Slack and Microsoft Teams are where we chat they don’t really enable communication around a piece of content in your product well. People resort to taking screenshots and sharing them on other services, while describing the relevant context manually “See the fourth item from the top in this list”. 

This is why purpose built collaboration apps like Notion, Figma and Google Docs have offered commenting for many years now, but for the average app, building one is usually a significant undertaking, or one done to a bare-minimum standard which misses users expectations set by industry leading products.

Our goal is to create a high-quality, easy-to-integrate commenting system, which helps your users collaborate effectively, in your product, with full context. So you can focus on your core value and meet your users expectations with minimal effort.

### Key Features

1. **Collaboration**
    
    Comment on anything in your app, whether be it a table, chart, piece of text, or a sale, invoice, or product. CollabKit works with any interface, letting your users leave comments on the item in question.
    
2. **Easy to integrate**
    
    Drop-in our SDK and ship commenting in minutes. We take care of all the hard bits like realtime, seen state, email notifications, rich text formatting, emojis and more… 
    
3. **Customisable**
    
    Fully customisable, pick the components that suit your apps interface and adjust the theme to set font size, line heights, spacing, padding, margins, typography and colours. Match your apps look and feel so it looks like you built it in-house. Or go all the way and use our unstyled building blocks to create an entirely new commenting or collaboration experience completely integrated with your app.
    
4. **Human**
    
    Let your users work as a team in your product. With emojis, GIFs, file and photo sharing, and replies your users will feel right at home with our commenting system.
    

### Community

1. **Discord**
    
    To get involved with the CollabKit community, ask questions, and share tips, join our Discord.
    
2. **Twitter**
    
    To receive updates on new primitives, announcements, blog posts and general CollabKit tips, follow along on Twitter
    
3. **Github**
    
    To file issues, request features, and contribute, check out our Github.`}
      />
    </div>
  );
}
