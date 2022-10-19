import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

import * as styles from '../styles/Hero.css';
import { vars } from '../styles/Theme.css';
import { useFloatingNodeId, useFloating, autoUpdate } from '@floating-ui/react-dom-interactions';

import alicia from '../assets/alicia.png';
// import julia from '../assets/julia.png';
// 1: {
//   avatar: julia,
//   name: 'Julia Efes',
//   timeAgo: '5m',
//   message: <>Looks great! Maybe we should change it to ‘commenting’?</>,
// },
import james from '../assets/james.png';
import { GetStartedButton } from './GetStartedButton';

import UISvg from '../assets/home/hero/ui.svg';

const messages = {
  0: {
    avatar: alicia,
    name: 'Alicia Baker',
    timeAgo: '10m',
    message: (
      <>
        May isn’t looking great. <span>@james</span> Let’s change distributor?
      </>
    ),
  },
  1: {
    avatar: james,
    name: 'James Hanson',
    timeAgo: 'Just now',
    message: <>I'm on it!</>,
  },
};

function Message(props: { message: typeof messages[keyof typeof messages] }) {
  return (
    <div className={styles.message}>
      <img src={props.message.avatar} className={styles.avatar} />
      <div>
        <div className={styles.name}>
          {props.message.name} <span className={styles.timeAgo}>{props.message.timeAgo}</span>
        </div>
        <div className={styles.body}>{props.message.message}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const isSmallScreen = useIsSmallScreen();
  const title = isSmallScreen ? (
    <>Commenting made easy</>
  ) : (
    <>
      Commenting
      <br /> made easy
    </>
  );
  const description = isSmallScreen ? (
    <>Add contextual collaboration to your product with our customisable React SDK.</>
  ) : (
    <>
      Add contextual collaboration to your product
      <br /> with our customisable React SDK.
    </>
  );

  const nodeId = useFloatingNodeId();
  const { floating, reference, context } = useFloating({
    nodeId,
    strategy: 'fixed',
    placement: 'right-start',
    open: true,
    whileElementsMounted: autoUpdate,
  });

  return (
    <section
      style={{
        background: vars.color.yellow,
        paddingTop: 240,
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <h1 className={styles.h1}>{title}</h1>
      <h3>{description}</h3>
      <GetStartedButton />
      <div
        ref={floating}
        style={{
          position: context.strategy,
          left: context.x ?? 0,
          top: context.y ?? 0,
          marginTop: -40,
          marginLeft: -280,
        }}
      >
        <div className={styles.messageList}>
          <Message message={messages[0]} />
          <Message message={messages[1]} />
        </div>
      </div>

      <div className={styles.uiWrap} ref={reference}>
        <img src={UISvg} />
      </div>
    </section>
  );
}
