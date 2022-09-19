import React from 'react';
import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonPrimary from './components/ButtonPrimary';

import { Mjml, MjmlBody, MjmlSection, MjmlColumn, MjmlText, MjmlSpacer } from 'mjml-react';

import reactStringReplace from 'react-string-replace';

// todo refactor this so it's the same code as in the clients
// except we use a MjmlText instead of a span to render
// the mention
export const MARKDOWN_LINK_REGEXP = /\[(.*)\]\((.*)\)/;

export function MarkdownBody(props: { body: string; onLinkClick?: (e: React.MouseEvent) => void }) {
  return (
    <>
      {reactStringReplace(props.body, /(\[.*\]\(.*\))/g, (match, i) => {
        // parse and render markdown as an A tag
        const linkMatches = match.match(MARKDOWN_LINK_REGEXP);
        if (linkMatches && linkMatches[0]) {
          return <span key={i}>{linkMatches[1]}</span>;
        }

        // todo check if it matches a profile before bolding
        return (
          <MjmlText key={i} fontWeight={700}>
            {match}
          </MjmlText>
        );
      })}
    </>
  );
}

type NotificationEmailProps = {
  entity: string;
  action: string;
  preposition: string;
  actor: string;

  appLogoUrl?: string;

  accentColor?: string;
  commentList: {
    createdById: string;
    createdAt: number;
    body: string;
    type: string;
    mentions?: { [userId: string]: boolean };
  }[][];
  ctaText?: string;
  profiles: { [id: string]: { name?: string; avatar?: string; email?: string; color?: string } };
  openUrl: string;
};

function Comment(props: { actorColor: string; actorName: string; commentBody: string[] }) {
  return (
    <MjmlSection textAlign="left" padding="32px 0px 32px">
      <MjmlColumn width="44px" padding="0px">
        <MjmlText
          lineHeight={'32px'}
          align={'left'}
          fontWeight={800}
          color={'white'}
          cssClass={`avatar color ${props.actorColor}`}
        >
          {props.actorName.slice(0, 1)}
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn padding={'0px'}>
        <MjmlText fontWeight={500} fontSize={'18px'} lineHeight={'32px'}>
          {props.actorName}
        </MjmlText>
        {props.commentBody.map((line) => (
          <MjmlText padding="16px 24px 0px" fontWeight={400} fontSize={'18px'} lineHeight={'27px'}>
            <MarkdownBody body={line} />
          </MjmlText>
        ))}
      </MjmlColumn>
    </MjmlSection>
  );
}

const NotificationEmail: React.FC<NotificationEmailProps> = ({
  accentColor,
  profiles,
  openUrl,
  appLogoUrl,
  commentList,
  actor,
  action,
  entity,
  preposition,
}) => {
  if (commentList.length === 0) {
    return null;
  }

  const subject =
    actor.length > 0 ? (
      <>
        <b>{actor}</b>{' '}
        <span>
          {action} {preposition} <b>{entity}</b>
        </span>
      </>
    ) : (
      <>
        <b>{action}</b>{' '}
        <span>
          {preposition} <b>{entity}</b>
        </span>
      </>
    );

  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <Header logoUrl={appLogoUrl} />
        <MjmlSection padding="0px 24px 0" cssClass="smooth">
          <MjmlColumn>
            {
              <MjmlText
                padding="32px 0 32px"
                fontSize={'28px'}
                lineHeight={'35px'}
                cssClass="paragraph"
              >
                {subject}
              </MjmlText>
            }
          </MjmlColumn>
        </MjmlSection>
        {commentList.map((commentGroup) => {
          const profile = profiles[commentGroup[0].createdById];
          if (!profile) {
            return null;
          }
          return (
            <Comment
              actorColor={profile.color ?? 'sky'}
              actorName={profile.name ?? 'Anonymous'}
              commentBody={commentGroup.map((comment) => comment.body)}
            />
          );
        })}
        <MjmlSection padding="0 0 0" cssClass="smooth">
          <MjmlColumn>
            <>
              <ButtonPrimary
                color={accentColor ?? '#000'}
                link={openUrl}
                uiText={commentList.length === 1 ? 'View Comment' : 'View Comments'}
              />
              <MjmlSpacer height="8px" />
            </>
          </MjmlColumn>
        </MjmlSection>
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};

export default NotificationEmail;
