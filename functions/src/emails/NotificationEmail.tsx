import React from 'react';
import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonPrimary from './components/ButtonPrimary';

import { Mjml, MjmlBody, MjmlSection, MjmlColumn, MjmlText, MjmlSpacer } from 'mjml-react';

type NotificationEmailProps = {
  appLogoUrl?: string;
  activity: string;
  threadName?: string;
  workspaceName?: string;
  accentColor?: string;
  commentList: { createdById: string; createdAt: number; body: string; type: string }[][];
  ctaText?: string;
  profiles: { [id: string]: { name?: string; avatar?: string; email?: string; color?: string } };
  productName?: string;
  openUrl: string;
};

function Comment(props: { actorColor: string; actorName: string; commentBody: string[] }) {
  return (
    <MjmlSection textAlign="left" padding="0px 0px 40px">
      <MjmlColumn width="44px" padding="0px">
        <MjmlText
          lineHeight={'28px'}
          align={'left'}
          fontWeight={800}
          color={'white'}
          cssClass={`avatar color ${props.actorColor}`}
        >
          {props.actorName.slice(0, 1)}
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn padding={'0px'}>
        <MjmlText fontWeight={700} fontSize={'18px'} lineHeight={'26px'}>
          {props.actorName}
        </MjmlText>
        {props.commentBody.map((line) => (
          <MjmlText padding="16px 24px 0px" fontWeight={400} fontSize={'18px'} lineHeight={'26px'}>
            {line}
          </MjmlText>
        ))}
      </MjmlColumn>
    </MjmlSection>
  );
}

const NotificationEmail: React.FC<NotificationEmailProps> = ({
  activity,
  threadName,
  workspaceName,
  accentColor,
  productName,
  profiles,
  openUrl,
  appLogoUrl,
  commentList,
}) => {
  const entityName = threadName ?? workspaceName ?? productName;

  if (commentList.length === 0) {
    return null;
  }

  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <Header logoUrl={appLogoUrl} />
        <MjmlSection padding="40px 24px 0" cssClass="smooth">
          <MjmlColumn>
            {
              <MjmlText
                padding="0 0 26px"
                fontSize={'24px'}
                lineHeight={'32px'}
                cssClass="paragraph"
              >
                <b>{activity}</b>{' '}
                {entityName ? (
                  <span>
                    in <b>{entityName}</b>
                  </span>
                ) : null}
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
        <MjmlSection padding="0 24px 0" cssClass="smooth">
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
