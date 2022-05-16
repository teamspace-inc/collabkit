# Collabkit

> Components for realtime collaboration in your web app with React.

- ⚛️ Add to your app in minutes using high quality React components.
- ☁️ Zero servers to set up – uses our global infra.
- 💅 Add styles with your preferred CSS technology.

 
## Quick start

### Add commenting to any React web app

Install Collabkit with your favorite package manager:
```
yarn add @collabkit/react
```

Then include the commenting UI in your React component:

```javascript
import { CollabProvider, Comments, CommentBox } from '@collabkit/react';

export function App() {
  return (
    <CollabProvider apiKey="<ADD_COLLABKIT_API_KEY>">
      <Comments thread="1" />
      <CommentBox
        thread="1"
        placeholder="Add a comment…" />
    </CollabProvider>
  )
}
```

## How it works

