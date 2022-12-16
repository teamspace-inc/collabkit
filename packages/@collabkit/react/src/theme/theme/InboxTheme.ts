export const InboxTheme = {
  inbox: {
    gap: 'inbox-gap',
    background: 'inbox-background',
    width: 'inbox-width',

    header: {
      color: 'inbox-header-color',
      fontSize: 'inbox-header-font-size',
      fontWeight: 'inbox-header-font-weight',
      lineHeight: 'inbox-header-line-height',
      letterSpacing: 'inbox-header-letter-spacing',
    },

    item: {
      background: 'inbox-item-background',
      borderBottom: 'inbox-item-border-bottom',
      gap: 'inbox-item-gap',

      paddingTop: 'inbox-item-padding-top',
      paddingRight: 'inbox-item-padding-right',
      paddingLeft: 'inbox-item-padding-left',
      paddingBottom: 'inbox-item-padding-bottom',

      hover: {
        background: 'inbox-item-hover-background',
      },

      active: {
        background: 'inbox-item-active-background',
      },

      facepile: {
        avatar: {
          size: 'inbox-item-facepile-avatar-size',
        },
      },

      replyCount: {
        fontWeight: 'inbox-item-reply-count-font-weight',
        fontSize: 'inbox-item-reply-count-font-size',
        lineHeight: 'inbox-item-reply-count-line-height',
        letterSpacing: 'inbox-item-reply-count-letter-spacing',

        color: 'inbox-item-reply-count-color',
      },

      timestamp: {
        fontWeight: 'inbox-item-timestamp-font-weight',
        fontSize: 'inbox-item-timestamp-font-size',
        lineHeight: 'inbox-item-timestamp-line-height',
        letterSpacing: 'inbox-item-timestamp-letter-spacing',

        color: 'inbox-item-timestamp-color',
      },

      unreadDot: {
        width: 'inbox-item-unread-dot-width',
        height: 'inbox-item-unread-dot-height',
        borderRadius: 'inbox-item-unread-dot-border-radius',
        background: 'inbox-item-unread-dot-background',
      },
    },
  },
};
