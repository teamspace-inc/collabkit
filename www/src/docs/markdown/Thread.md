### threadId: string

A unique ID that represents this thread.

### name?: string

A name for the thread. Used in email notifications to refer to the thread. e.g. if you set name to ‘Task 1’ and ‘John’ writes a comment, the email subject will be ‘John left a comment on Task 1’

### url?: string

The URL of the page containing the thread. Used in email notifications and Inbox to take the user to the thread on click.

Defaults to `window.location.href`

Set this to a custom value if you are rendering the same thread (i.e. they have the same `threadId` in multiple pages and one of them is the source of truth. e.g. if you are rendering the same Thread in [staging.your-app.com/task1](http://staging.your-app.com/task1) and your-app.com/task1 you should set it to the appropriate URL so Rendering the thread in one environment does not affect another.

### showHeader?: boolean

Set this to `false` hide the thread header.

Defaults to `false`

### autoFocus?: boolean

Set this to automatically focus the composer input on render.

Defaults to `false`
