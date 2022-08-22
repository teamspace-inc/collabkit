import React from 'react';
import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonPrimary from './components/ButtonPrimary';

import { Mjml, MjmlBody, MjmlSection, MjmlColumn, MjmlText, MjmlSpacer } from 'mjml-react';

type NotificationEmailProps = {
  activity: string;
  threadName?: string;
  workspaceName?: string;
  commentList: { createdById: string; createdAt: number; body: string; type: string }[][];
  ctaText?: string;
  profiles: { [id: string]: { name?: string; avatar?: string; email?: string; color?: string } };
  productName?: string;
};

function Comment(props: { actorColor: string; actorName: string; commentBody: string[] }) {
  return (
    <MjmlSection textAlign="left" padding="0px 0px 40px">
      <MjmlColumn width="44px" padding="0px">
        <MjmlText
          lineHeight={'28px'}
          align={'left'}
          fontWeight={800}
          cssClass={`avatar color ${props.actorColor}`}
        >
          {props.actorName.slice(0, 1)}
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn padding={'0px'}>
        <MjmlText color={'white'} fontWeight={700} fontSize={'18px'} lineHeight={'26px'}>
          {props.actorName}
        </MjmlText>
        {props.commentBody.map((line) => (
          <MjmlText
            padding="16px 24px 0px"
            color={'white'}
            fontWeight={400}
            fontSize={'18px'}
            lineHeight={'26px'}
          >
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
  productName,
  profiles,
  commentList,
}) => {
  if (commentList.length === 0) {
    return null;
  }

  if (commentList.length === 1) {
    console.log('just one comment!');
  }

  const entityName = threadName ?? workspaceName ?? productName;
  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <Header />
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
          return (
            <Comment
              actorColor={profiles[commentGroup[0].createdById].color ?? 'sky'}
              actorName={profiles[commentGroup[0].createdById].name ?? 'Anonymous'}
              commentBody={commentGroup.map((comment) => comment.body)}
            />
          );
        })}
        <MjmlSection padding="20px 24px 0" cssClass="smooth">
          <MjmlColumn>
            <>
              <ButtonPrimary
                link={'#'}
                uiText={productName ? `Open ${productName}` : 'View Comment'}
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
