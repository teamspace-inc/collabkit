import { Upside } from './Upside';

import {
  Grid,
  Inset,
  Slide,
  VStack,
  TextCenter,
  H1,
  Box,
  Text,
  TextLeft,
  styled,
  HStack,
  A,
  Center,
  theme,
  css,
  MaxWidth,
  Button,
} from './UIKit';

import { ChatTeardrop } from 'phosphor-react';
import { CollabKit } from '@collabkit/react';

export function Integrate() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1 style={{ marginBottom: 0 }}>
                Integrate our React SDK with just a few lines of code.
              </H1>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

const bigShadow = `rgba(0, 0, 0, 0.024) 0px 0px 0px 1px,
rgba(0, 0, 0, 0.1) 0px 1px 0px 0px,
rgba(0, 0, 0, 0.2) 0px 0px 8px 0px,
rgba(0, 0, 0, 0.3) 0px 20px 30px 0px`;

const Avatar = styled('img', {
  width: '40px',
  height: '40px',
  borderRadius: '64px',
});

function Comment(props: { img: string; body: string; reverse?: boolean }) {
  return (
    <HStack gap={1} style={props.reverse ? { flexDirection: 'row-reverse' } : {}}>
      <Avatar src={props.img} />
      <VStack gap={0} style={{ lineHeight: '1.25rem' }}>
        <TextLeft>
          <Text display="block">
            <b>Maria</b>
          </Text>
          <Text>{props.body}</Text>
        </TextLeft>
      </VStack>
    </HStack>
  );
}

function CommentButton() {
  return (
    <HStack>
      <ChatTeardrop weight="fill" />
      <Text>Comment</Text>
    </HStack>
  );
}

const StyledThread = styled('div', {
  background: '$neutral12',
  minHeight: '320px',
});

function Thread() {
  return (
    <StyledThread
      style={{
        borderRadius: '11px',
        padding: '1rem',
        boxShadow: bigShadow,
        minWidth: '320px',
        maxWidth: '360px',
      }}
    >
      <Grid gap={1}>
        <VStack gap={1} style={{}}>
          <Comment
            img="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
            body="hey, what is this expense related to?"
          />
          <Comment
            img="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
            body="oh! it's for the offsite :)"
          />
          <Comment
            img="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
            body="ok let's ask @Laura for approval"
          />
        </VStack>
      </Grid>
    </StyledThread>
  );
}

function Comments() {
  return (
    <Grid gap={1}>
      <Comment
        img="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
        body="hey, what is this expense related to?"
      />
      <Comment
        reverse={true}
        img="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
        body="oh! it's for the offsite :)"
      />
    </Grid>
  );
}

export function Hero() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }} gap={3}>
              <H1>
                Make your SaaS app stickier with our React commenting SDK. <br />
                <A href="#">Try for free &gt;</A>
              </H1>
              <Center>
                <Comments />
              </Center>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

const pricePlans = {
  free: {
    title: 'Free',
    price: '$0',
    features: ['1 environment', '100 monthly users', 'Analytics panel'],
  },
  pro: {
    title: 'Pro',
    price: '$199',
    features: [
      '3 environments',
      'Unlimited monthly users',
      'Analytics panel',
      'Custom logo',
      'Custom colors',
      'Custom branding',
    ],
  },
  enterprise: {
    title: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Volume discounts',
      'Custom security package',
      'Custom email domain',
    ],
  },
};

function PricePlan(props: { plan: keyof typeof pricePlans }) {
  const plan = pricePlans[props.plan];
  const features = plan.features.map((feature, i) => (
    <li key={i}>
      <Text>{feature}</Text>
    </li>
  ));
  return (
    <VStack>
      <TextLeft>
        <Text>{plan.title}</Text>
        <H1>{plan.price}</H1>
        <ul>{features} </ul>
      </TextLeft>
    </VStack>
  );
}

export function Pricing() {
  const planKeys = Object.keys(pricePlans) as (keyof typeof pricePlans)[];
  const plans = planKeys.map((plan) => (
    <Box round={2} pad={1}>
      <PricePlan plan={plan} />
    </Box>
  ));
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1>Try it for free.</H1>
              <Grid cols={3} gap={1}>
                {plans}
              </Grid>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function Commenting() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack>
              <H1>CollabKit adds commenting to your app.</H1>
              <Grid rows={1} gap={1}>
                <Grid cols={1} gap={1}>
                  <Box round={2}>
                    <Comments></Comments>
                  </Box>
                </Grid>
              </Grid>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function Commenting2() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack>
              <H1>So your users in the same team or company can collaborate in context.</H1>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function OtherFeatures() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1>Includes: Reactions, replies, read receipts, file &amp; photo sharing.</H1>
              <Grid rows={2} gap={1}>
                <Grid cols={'2x1'} gap={1}>
                  <Box round={2} />
                  <Box round={2} />
                </Grid>
                <Grid cols={'1x2'} gap={1}>
                  <Box round={2} />
                  <Box round={2} />
                </Grid>
              </Grid>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function Realtime() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1 style={{ marginBottom: 0 }}>Yes it's realtime.</H1>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function Personalization() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1>Make it your own. Set colors, typography and more.</H1>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function Analytics() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1 style={{ marginBottom: 0 }}>
                See which users &amp; teams are commenting the most.
              </H1>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

export function API() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1>It's your data. Use our REST API to export and interact with comments.</H1>
              <Grid cols={1} gap={1}>
                <Box round={2}></Box>
              </Grid>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}

function SimpleHero() {
  return (
    <Slide>
      <Center>
        <MaxWidth>
          <Grid cols={2} pad={3}>
            <VStack gap={1}>
              <H1 style={{ marginBottom: '0.75rem' }} color="primary">
                Add collaboration to your SaaS app.
                <br />
              </H1>
              <Text fontSize={1} color="secondary">
                Use our React SDK to add comment buttons and inline comment threads to your app.
              </Text>
              <div>
                <Button
                  type="cta"
                  style={{
                    fontSize: '1.25rem',
                  }}
                >
                  Get the code
                </Button>
              </div>
            </VStack>
            <VStack>
              <CommentButton />
              <Chat />
            </VStack>
          </Grid>
        </MaxWidth>
      </Center>
    </Slide>
  );
}

const LogoText = styled('span', {
  fontSize: '20px',
  color: '$neutral11',
});

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <LogoText>CollabKit</LogoText>
      <ChatTeardrop size={24} color={theme.colors.accent10.toString()} weight="fill" />
    </div>
  );
}

function Chat() {
  return (
    <div>
      <CollabKit.Workspace workspaceId="demo">
        <CollabKit.Thread threadId="example" />
      </CollabKit.Workspace>
    </div>
  );
}

function Header() {
  return (
    <div style={{ position: 'fixed', padding: '2rem' }}>
      <Logo />
    </div>
  );
}

export function Home() {
  return (
    <div>
      <Header />
      <SimpleHero />
      {/* <Hero />
      <Commenting />
      <Commenting2 />
      <Upside />
      <OtherFeatures />
      <Realtime />
      <Personalization />
      <Integrate />
      <Analytics />
      <API />
      <Pricing /> */}
    </div>
  );
}
