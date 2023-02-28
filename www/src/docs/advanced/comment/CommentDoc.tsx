import React from 'react';

// import { renderCodeSnippet } from '../../CodeEditor';
// import { DocLink } from '../../Doc';
// import Anatomy from './CommentAnatomy.tsx?raw';
// import Usage from './CommentUsage.tsx?raw';
// import {
//   AdvancedDisclaimer,
//   AdvancedHeroDemo,
//   AdvancedPart,
//   AdvancedProps,
// } from '../AdvancedCommon';
// import {
//   Comment,
//   CommentActions,
//   CommentBody,
//   CommentCreatorAvatar,
//   CommentCreatorName,
//   CommentHeader,
//   CommentMenu,
//   CommentRoot,
//   CommentTimestamp,
//   ThreadProvider,
// } from '@collabkit/react';
// import React from 'react';

// const commentContainer: React.CSSProperties = {
//   width: '100%',
//   // background: vars.color.bgContrastMedium,
// };

// function CommentDemo(props: { children?: React.ReactNode }) {
//   return (
//     <ThreadProvider threadId="thread3">
//       <div style={commentContainer}>
//         <CommentRoot commentId="event1">{props.children}</CommentRoot>
//       </div>
//     </ThreadProvider>
//   );
// }

// export function CommentDoc() {
//   return (
//     <>
//       <h2>Render a comment</h2>
//       <AdvancedDisclaimer componentName="Comment" />

//       <div>
//         <h3>Demo</h3>
//         <AdvancedHeroDemo>
//           <ThreadProvider threadId="thread3">
//             <div style={{ ...commentContainer }}>
//               <Comment commentId="event1" />
//             </div>
//           </ThreadProvider>
//         </AdvancedHeroDemo>
//       </div>

//       <div>
//         <h3>Usage</h3>
//         <p>Renders a Comment. The most basic usage is as follows.</p>
//         {renderCodeSnippet(Usage)}
//         <p>
//           You must render <code className="ReactNode">Comment</code> inside a{' '}
//           <code className="ReactNode">Thread.Provider</code> so it knows which thread the{' '}
//           <code>commentId</code> is in.{' '}
//         </p>
//       </div>

//       <div>
//         <h3>Props</h3>
//         <AdvancedProps
//           props={[
//             ['commentId', 'string', <>The id of the comment.</>],
//             [
//               'className',
//               'string | undefined',
//               <>
//                 Providing a <code>className</code> will override any default styles and apply your
//                 own.
//               </>,
//             ],
//           ]}
//         />
//       </div>

//       <div>
//         <h3>Anatomy</h3>
//         <p>
//           Lets look at the parts that make up a <code className="ReactNode">{'<Comment />'}</code>.
//         </p>
//         {renderCodeSnippet(Anatomy, [[1, 2]])}
//         <p>
//           You can render just the individual parts too, if you want to just render just the comment
//           body. Replace some components with your own custom ones. Or even insert new components in
//           between the existing ones you can do so. <br />
//           <br />
//           Ensure components are be rendererd within an instance of{' '}
//           <code className="ReactNode">{'<CommentRoot>'}</code>.
//         </p>
//       </div>
//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <div>{/* insert components here */}</div>
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={<CommentDemo />}
//         description={
//           <>
//             The root component of a Comment Sets up Comment & Profile providers for you. Is required
//             to other Comment components further down this list.
//             <br />
//             Creates <code className="ReactNode">{'<CommentProvider>'}</code> for the provided{' '}
//             <code>commentId</code> and a<code className="ReactNode">{'<ProfileProvider>'}</code> for
//             the comments author for you. <br />
//             <br />
//             And automatically marks comment as seen when mounted and visible in the browser
//             viewport.
//           </>
//         }
//         title={'CommentRoot'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//       <CommentCreatorAvatar />
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={
//           <CommentDemo>
//             <CommentCreatorAvatar />
//           </CommentDemo>
//         }
//         description={<>A component that renders the comment creator's avatar.</>}
//         title={'CommentCreatorAvatar'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <CommentHeader>
//       <CommentCreatorName />
//       <CommentTimestamp />
//     </CommentHeader>
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={
//           <CommentDemo>
//             <CommentHeader>
//               <CommentCreatorName />
//               <CommentTimestamp />
//             </CommentHeader>
//           </CommentDemo>
//         }
//         description={
//           <>
//             A convenience component that lays out the comment creator's name and the comment
//             timestamp horizontally.
//           </>
//         }
//         title={'CommentHeader'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <CommentCreatorName />
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={
//           <CommentDemo>
//             <CommentCreatorName />
//           </CommentDemo>
//         }
//         description={
//           <>
//             Renders the comment creator's name using{' '}
//             <DocLink href="/docs/profile">
//               <code className="ReactNode">{'<Profile.Name>'}</code>
//             </DocLink>
//           </>
//         }
//         title={'CommentCreatorName'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <CommentTimestamp />
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={
//           <CommentDemo>
//             <CommentTimestamp />
//           </CommentDemo>
//         }
//         description={<>Renders the comment creation timestamp.</>}
//         title={'CommentTimestamp'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <CommentActions />
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={
//           <CommentDemo>
//             <CommentActions />
//           </CommentDemo>
//         }
//         description={
//           <>
//             Renders the actions that can be taken on a comment. <br />
//             <br />
//             This includes the ability to edit, delete or resolve the comment's thread (if is the
//             first comment, and the authenticated user is the comment's author).
//           </>
//         }
//         title={'CommentActions'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<ThreadProvider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <CommentBody />
//   </CommentRoot>
// </ThreadProvider>);`}
//         demo={
//           <CommentDemo>
//             <CommentBody />
//           </CommentDemo>
//         }
//         description={
//           <>
//             Renders the comment body. <br />
//             <br />
//             Including mentions, links and rich-text in markdown.
//           </>
//         }
//         title={'CommentBody'}
//       />

//       <AdvancedPart
//         code={`import { Comment } from '@collabkit/react';

// export default () => (<Thread.Provider threadId="thread1">
//   <CommentRoot commentId="event1">
//     <CommentMoreMenu>
//   </CommentRoot>
// </Thread.Provider>);`}
//         demo={
//           <CommentDemo>
//             <CommentMenu />
//           </CommentDemo>
//         }
//         description={
//           <>
//             Renders Resolve, Edit, Delete and other actions the authenticated user can take. <br />
//             <br />
//             All actions apart from the first one are rolled up into a '3 dots' more menu.
//             <br />
//             <br />
//             Actions that are not allowed for the authenticated user are not displayed. Ex. You will
//             only see Edit and Delete in the menu for comments you have authored.
//             <br />
//           </>
//         }
//         title={'CommentMoreMenu'}
//       />
//     </>
//   );
// }
