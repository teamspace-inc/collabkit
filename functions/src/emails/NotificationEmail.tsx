import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonPrimary from './components/ButtonPrimary';
import React from 'react';
import markdown from 'markdown-it';

const md = markdown({ html: true });

import { Mjml, MjmlBody, MjmlSection, MjmlColumn, MjmlText, MjmlSpacer } from 'mjml-react';

function Raw({ tag, html }: { tag: string; html: string }) {
  return React.createElement(tag || 'mj-raw', {
    className: 'mdbody',
    dangerouslySetInnerHTML: {
      __html: html,
    },
  });
}

export function Markdown(props: { body: string }) {
  return <Raw tag="span" html={md.render(props.body)} />;
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
  unsubscribeToken: string;
};

function Comment(props: { actorColor: string; actorName: string; commentBody: string[] }) {
  return (
    <MjmlSection textAlign="left" padding="0px 0px 32px">
      <MjmlColumn width="44px" padding="0px">
        <MjmlText
          lineHeight={'32px'}
          align={'left'}
          fontWeight={800}
          color={'white'}
          cssClass={`avatar color ${props.actorColor}`}
        >
          {props.actorName.slice(0, 1) || 'A'}
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn padding={'0px'} width={'420px'}>
        <MjmlText fontWeight={600} fontSize={'18px'} lineHeight={'32px'}>
          {props.actorName}
        </MjmlText>
        {props.commentBody.map((line) => (
          <MjmlText padding="0px 24px 0px" fontWeight={400} fontSize={'18px'} lineHeight={'27px'}>
            <Markdown body={line} />
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
  unsubscribeToken,
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
              <MjmlText>
                <a
                  className="unsubscribe"
                  href={`https://www.collabkit.dev/unsubscribe?token=${unsubscribeToken}`}
                  target="_blank"
                >
                  Unsubscribe from this comment thread
                </a>
              </MjmlText>
            </>
          </MjmlColumn>
        </MjmlSection>
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};

export default NotificationEmail;
