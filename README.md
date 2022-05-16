# Collabkit

> Components for realtime collaboration in your web app with React.

- ⚛️ Add to your app in minutes using high quality React components.
- ☁️ Zero servers to set up – uses our global infra.
- 💅 Add styles with your preferred CSS technology.

 
## Quick start

### Add commenting to any React web app

Install Collabkit with your favorite package manager:
```
yarn add @collabkit/comments
```

Then include the commenting UI in your React component:

```javascript
import { CollabProvider, Comments } from '@collabkit/ui';

// Add the provider to your root component:
export function App() {
  return (
    <CollabProvider apiKey="<ADD_COLLABKIT_API_KEY>">
      <Document id="1" />
    </CollabProvider>
  )
}

// Add Comments to any component:
function Document() {
  // ...
  return (
    <article>
      <p>{doc.text}</p>
      <Comments id={doc.id} />
    </article>
  )
}
```

## How it works

tbd
