### Workspaces

Workspaces are analogous to Slack Workspaces. A space for each team or company using your product.

**By default:**

1. All comment threads in a Workspace are visible to all members of a Workspace.
2. Members will be notified about new comments in the same Workspace.

**What if I don’t have Workspaces in my app?**

If you don’t have the concept of Workspaces in your app, but wish to enable commenting for different users, set `workspaceId` to default.

This is a special ID which prevents comment threads from being visible to other users of your app by default. Instead only people who can view a page you include a Thread component on will be able to see one.

```tsx
workspaceId: 'default';
```

### Secure Mode

To prevent an impersonation attack, and avoid sending all user and workspace data to your client enable Secure Mode which requires generate a workspace and user specific token for each user in your app.
