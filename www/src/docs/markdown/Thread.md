#### threadId: string

A unique ID that represents this thread.

#### name?: string

A name for the thread. Used in email notifications to refer to the thread. e.g. if you set name to ‘Task 1’ and ‘John’ writes a comment, the email subject will be ‘John left a comment on Task 1’

#### url?: string

The URL of the webpage this thread is rendered on. Used in email notifications and the [Inbox](/docs/inbox) to help a user get back to a thread.

Defaults to `window.location.href`

#### showHeader?: boolean

Set this to `true` to show the thread header.

Defaults to `false`

#### autoFocus?: boolean

Set this to automatically focus the composer input on render.

Defaults to `false`
