import React from 'react';

import NotificationEmail from '../NotificationEmail';

const sample = {
  to: 'janet@example.org',
  from: 'reply@mail.collabkit.dev',
  subject: 'New comments on Demo thread',
  body: {
    template: 'new-comments',
    data: {
      thread: { info: { name: 'Demo thread', url: 'https://collabkit-demo.teamspace.dev/' } },
      workspace: {
        profiles: {
          '123123': { color: 'yellow' },
          '101318975663807693762': {
            avatar:
              'https://lh3.googleusercontent.com/a/AItbvmno6mk9y_Xj6cAwQxYBfXPIBkszPGCvYUIG4MZh=s96-c',
            color: 'crimson',
            email: 'dharmesh@marchopartners.com',
            name: 'Dharmesh Malam',
          },
          '105986699029334209805': {
            avatar:
              'https://lh3.googleusercontent.com/a/AItbvmlTMTUoqMqH5ZmN3O0-tZ-DyFYr1JES2FytZrSg=s96-c',
            color: 'lime',
            email: 'namit@useteamspace.com',
            name: 'Namit Chadha',
          },
          '107156259038502012149': {
            avatar:
              'https://lh3.googleusercontent.com/a/AItbvmkPvG-2pAPQPU_tpnunnQBZygrr9cdduxpopxWEkw=s96-c',
            color: 'bronze',
            email: 'immonenv@gmail.com',
            name: 'Ville',
          },
          '107640218691658057490': {
            avatar:
              'https://lh3.googleusercontent.com/a-/AFdZucqVNk4LzIb5YmrbESWVYt8p7s8iVtff-zwCxBEzCqA=s96-c',
            color: 'grass',
            email: 'theburt@gmail.com',
            name: 'Dom Burt',
          },
          '111311543387847112277': {
            avatar:
              'https://lh3.googleusercontent.com/a-/AFdZucrsBZbMFsSWgx-w5Or84Od4h_S-U5EYH-a7OXwiYA=s96-c',
            color: 'cyan',
            email: 'nabilsharif@gmail.com',
            name: 'Nabil Sharif',
          },
          '112557620140515558394': {
            avatar:
              'https://lh3.googleusercontent.com/a-/AFdZuconT9JD1UfUiBdKURq0IhIr1EO9aPixPyxqLKX-=s96-c',
            color: 'yellow',
            email: 'michiel@tella.tv',
            name: 'Michiel Westerbeek',
          },
          '113383695894979946430': {
            avatar:
              'https://lh3.googleusercontent.com/a/AItbvmmLTNhnvS8SIPjSvq4-mmP1OHxbsl_OcdKP7BrK=s96-c',
            color: 'mauve',
            email: 'ville@functo.com',
            name: 'Ville Immonen',
          },
          '118153377351485973303': {
            avatar:
              'https://lh3.googleusercontent.com/a-/AFdZucowweFAjjo4_0YrUmdCdCx7A5JTVT6iui0VE_eyKA=s96-c',
            color: 'tomato',
            email: 'namit.chadha@gmail.com',
            name: 'Namit Chadha',
          },
          alice: { color: 'lime', name: 'Alice', workspaceId: 'acme' },
          asd: { color: 'violet' },
          'janet-1': {
            color: 'plum',
            email: 'janet@example.org',
            name: 'Janet Reilly',
            workspaceId: 'acme',
          },
          undefined: { color: 'tomato' },
        },
        name: null,
      },
      comments: {
        list: [
          // [
          //   {
          //     body: 'Hello',
          //     createdAt: 1660248581769,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'World',
          //     createdAt: 1660248935109,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Again',
          //     createdAt: 1660249519859,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Hey there, this stuff is live',
          //     createdAt: 1660250457167,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Another message',
          //     createdAt: 1660251097789,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Test!',
          //     createdAt: 1660251734701,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Holo',
          //     createdAt: 1660254686076,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Test again',
          //     createdAt: 1660300080776,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'There you go',
          //     createdAt: 1660300452557,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          //   // ],
          //   // [
          //   {
          //     body: 'Message',
          //     createdAt: 1660300826390,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'Write',
          //     createdAt: 1660300978755,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'A',
          //     createdAt: 1660300992664,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'Message',
          //     createdAt: 1660301170768,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'New',
          //     createdAt: 1660301962626,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'Yes',
          //     createdAt: 1660302348077,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'FINAL',
          //     createdAt: 1660302871936,
          //     createdById: '118153377351485973303',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'Hello world',
          //     createdAt: 1660323184746,
          //     createdById: '105986699029334209805',
          //     type: 'message',
          //   },
          // ],
          // [
          //   {
          //     body: 'test',
          //     createdAt: 1660379193289,
          //     createdById: '112557620140515558394',
          //     type: 'message',
          //   },
          // ],
          [
            {
              body: 'it works!',
              createdAt: 1660560190610,
              createdById: '113383695894979946430',
              type: 'message',
            },
          ],
        ],
      },
    },
  },
};

export function newComments() {
  return (
    <NotificationEmail
      openUrl={sample.body.data.thread.info.url}
      appLogoUrl={
        'https://uploads-ssl.webflow.com/621c64f63b023c2de02255d3/621c65a1379d5f3a08216e47_logo_wide_black.png'
      }
      activity={`${sample.body.data.comments.list?.length} new comment`}
      productName="Dart"
      accentColor="#D73C56"
      commentList={sample.body.data.comments.list}
      profiles={sample.body.data.workspace.profiles}
    />
  );
}
