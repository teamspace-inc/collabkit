// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

// Docs: https://vercel.com/docs/concepts/functions/serverless-functions

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const typeDefs = /* GraphQL */ `
  type Query {
    thread(id: ID!): Thread
    annotations(objectId: String!, status: AnnotationStatusFilter): [Annotation]
    viewer: User
  }
  type User {
    id: ID!
    profile: Profile
    inbox: Inbox
  }
  type Inbox {
    unreadCount: Int
    threads(
      first: Int
      after: String
      order: InboxOrder
      statusFilter: InboxStatusFilter
    ): ThreadConnection
  }
  enum AnnotationStatusFilter {
    RESOLVED
    UNRESOLVED
  }
  enum InboxStatusFilter {
    UNREAD
    UNRESOLVED
    RESOLVED
  }
  enum InboxOrder {
    CREATED_AT_ASC
    CREATED_AT_DESC
  }
  type Profile {
    id: ID!
    name: String
    avatar: String
  }
  union Attachment = ImageAttachment | Annotation
  type ImageAttachment {
    id: ID!
    url: String
    width: Int
    height: Int
  }
  type Annotation {
    id: ID!
    url: String
    x: Int
    y: Int
    objectId: String
  }
  type Thread {
    id: ID!
    name: String
    url: String
    timeline(first: Int, after: String): EventConnection
  }
  type EventConnection {
    edges: [EventEdge]
    nodes: [Event]
    pageInfo: PageInfo
  }
  type EventEdge {
    cursor: String
    node: Event
  }
  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }
  interface Event {
    id: ID!
    type: String!
    createdAt: String!
    createdBy: Profile
  }
  type MessageEvent implements Event {
    id: ID!
    type: String!
    createdAt: String!
    createdBy: Profile
    body: String
    mentions: [Profile]
    attachments: [Attachment]
  }
  type EditEvent implements Event {
    id: ID!
    type: String!
    createdAt: String!
    createdBy: Profile
    body: String
  }
  type DeleteEvent implements Event {
    id: ID!
    type: String!
    createdAt: String!
    createdBy: Profile
    parent: Event
  }
  type ReactionEvent implements Event {
    id: ID!
    type: String!
    createdAt: String!
    createdBy: Profile
    emoji: String
    parent: Event!
  }
  type ThreadConnection {
    edges: [ThreadEdge]
    nodes: [Thread]
    pageInfo: PageInfo
  }
  type ThreadEdge {
    cursor: String
    node: Thread
  }
`;

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs,
    resolvers: {
      Query: {},
    },
  }),
  graphiql: {
    defaultQuery: /* GraphQL */ `
      query {
        viewer {
          id
          inbox {
            unreadCount
            threads {
              pageInfo {
                hasNextPage
              }
              nodes {
                id
                name
                url
                timeline(first: 100) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    cursor
                    node {
                      id
                      createdAt
                      createdBy {
                        id
                        avatar
                        name
                      }
                      ... on MessageEvent {
                        body
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
});
