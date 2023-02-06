# CollabKit

## Objects

CollabKit calls any piece of information in your app an 'object'. It could refer to a cell in a table, an invoice, a task, a customer, any piece of data.

Just like how the OpenGraph protocol enables any web page to become a rich object on social. Objects in CollabKit enable any part of your apps interface to being a rich object within collaboration.

Objects have a unique ID which helps CollabKit understand what your users are commenting on.

For example if you're writing a task management app and you have an interface with a list of tasks, you might write the following code to enable commenting per task:

```
<Commentable objectId="task-1">
  {<!-- code to render Task 1 here-->}
</Commentable>
```

## ObjectProps

### Overview

When a user leaves a comment on an object, and others want to reply, they'll want to see where the comment was left. To make navigating back to a comment easy you can supply CollabKit with `objectProps`.

ObjectProps accept any JS object which can be converted to JSON. We store them and provide an easy hook for you to access them in your app.

### Setting ObjectProps

For example, if you have a table view with a set of filters, you may want to record which filters were active when a user pins a comment to a table cell. To do this use the following code:

```
<Commentable
  objectId="customer-4231-name"
  objectProps={{
    filter: 'country: uk'
  }}>
  <TableCell>

  </TableCell>
</Commentable>
```

### Subscribe via a React Hook

And then elsewhere in your app subscribe to this data when a user is viewing a comment.

```
const object  = useSelectedObject();
```

When the user clicks the pin associated with `customer-4231-name` the hook will trigger.

```
console.log(object) // { objectId: 'customer-4231-name`, objectProps: { filter: 'country-uk' } }
```

You can then set the filter in your UI to the appropriate value recreating the context in which the comment was placed.

### Subscribe via a callback

If you're using a state management library as is common in SPAs you may want to subscribe directly to the selected object state from your store. To do so use the following code:

```
import { subscribe } from '@collabkit/client'

const unsubscribe = subscribe('selectedObject', (selectedObject) => {
  // update your store here
})
```

## Data Model

sending a new message = firebase.push('/$appId/$roomId/timeline')
get last 20 messages = firebase.get('/$appId/$roomId/timeline', { limit: 20 })
... you can paginate backend

interface Timeline {

```ts
  [messageId: string]: Message;
}

interface Event {
  type: "message" | "reaction |
  body: string;
  actorId: string;
  seenByIds: string[];
  parentId: string;
}
```

```
App = app developer app (agencycosproduct.com)
Firebase User = app developer account (ville@agency.co)

Unsecured
// create the custom token for the app (unsecured mode) with `additionalClaims = { appId }`

Secured
// create the custom token (on demand) for the app+endUserId

```

```ts
// How to generate the onDemand secured token:

const appId = 'some-app-id'; // nanoid to generate this
const endUserId = 'some-uid'; // provided by the HTTP request
const mode = 'SECURED' | 'UNSECURED'
const additionalClaims = {
  appId
  endUserId,
  mode,
};

getAuth()
  .createCustomToken(appId, additionalClaims)
  .then((customToken) => {
    // Send token back to client
  })
  .catch((error) => {
    console.log('Error creating custom token:', error);
  });
```

```jsonc
{
  "$appId": {
    "$roomId": {
      "timeline": {
        ".write": "auth.token.appId === $appId && root.child('apps').child(auth.token.appId).child('mode') === 'UNSECURED'
          ? true
          : newData.child("createdById") === auth.token.endUserId"
      }
    }
  }
}
```

```
Developer API

// Here's your secret key, don't share it with anyone, gives them full access

[] Copy Key
Regenerate

Cancel old keys



``
```

```ts
// server-side
import { createAccessToken } from '@collabkit/node';
async function authenticateUser() {
  // ...
  const collabkitUserToken = await createAccessToken({
    secretToken: process.env.COLLABKIT_SECRET_TOKEN,
    // user info
    userId: 'johndoe', // endUserId
    displayName: 'John Doe',
    email: 'john@example.com',
  });
  return {
    ...user,
    collabkitUserToken,
  };
}

// collabkit server

// 1. Validate and extract the `secretToken`
// 2. Check that the app with the ID from `appId` claim exists
// 3. Create `accessToken`, a custom token with claims `{appId, endUserId}`, respond with status 201 CREATED
import { setup, identify } from '@collabkit/react';

declare function identify(
  opts: { userId: string; email: string; displayName: string } | { userToken: string }
);

//
identify({ userToken: user.collabkitUserToken });

//
setup({ publicToken: import.env.VITE_COLLABKIT_PUBLIC_TOKEN });
identify({ userId, displayName, email });
```

// React components

<CollabKit.Provider token="asdasjdlkjasd">
<CollabKit.Thread id={threadId}>
</CollabKit.Provider>

// JS SDK

// # Manual signup
// Create a user in the Firebase User dashboard
// Create an entry in '/apps' for the app, associated with the user (support multiple developers per account from the start in the data model)
// Generate an unsecured token manually
// Email the appId + token to the email address for the firebase user

// # Self serve signup
// How to start using the product as a developer
// Sign up on collabkit.dev using Firebase Auth
// 1.

## Threading

```json
{
  "content": {
    "body": "replying in this thread",
    "m.relates_to": {
      "event_id": "$o4UfFtmLt_UcDgifa6WzwZXLtuiVWK8nv7D7ize2-CY",
      "rel_type": "m.thread"
    },
    "msgtype": "m.text"
  },
  "room_id": "!DhoDKksRbJbuUxqovN:matrix.org",
  "sender": "@villei:matrix.org",
  "type": "m.room.message",
  "event_id": "$azTcA8EHocLX3MdwnFy0hcP3yBdv_HeSdQ2P3A6DTWQ"
}
```

### Memberships

E.g. facepile of people in this conversation

```
/memberships/$appId/$endUserId
{
  '$roomId': true,
}

```

### End-user Profiles

```
/profiles/$appId/$endUserId
{
  displayName,
  photoURL,
  email
}
```

### User timeline (used for the notifications view)

```
/notifications/$appId/$endUserId
{
  preview: ...
  eventId: ...
}
```

### Room timeline

```
/timeline/$appId/$roomId
{
  -aaaa: {  <-- $eventId
    sender: "<nc endUserId>"
    body: hello!
  }
  ... 100 messages
  -bbbb: {
    sender: "<ville endUserId>"
    body: hello to you too!
    parent: "-aaaa"
  }
  -cccc: {
    body: "lunch anyone?"
  }
  <-- this is where everything new gets added
}

interface Event {
  type: "message" | "reaction" | "admin_message"
  body: string;
  createdBy: string;
  seenByIds: string[];
  parentId: string;
  createdAt: number
}
```

## Inbox view

```
/inbox/$appId/$endUserId

rooms: {
   '-roomId': {
     timestamp: number
     lastEventId:
     preview: {
        body: 'hello to you too!',
        sender: "<endUserId>"
      }
      seen: true/false
   }
}

```
