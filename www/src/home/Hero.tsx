import { useIsSmallScreen } from './useIsSmallScreen';
import * as styles from '../styles/Hero.css';
import { vars } from '../styles/Theme.css';
import {
  useFloatingNodeId,
  useFloating,
  autoUpdate,
  offset,
  size,
} from '@floating-ui/react-dom-interactions';

import alicia from '../assets/alicia.png';
import julia from '../assets/julia.png';
import james from '../assets/james.png';
import { GetStartedButton } from './GetStartedButton';

const messages = {
  0: {
    avatar: alicia,
    name: 'Alicia Baker',
    timeAgo: '10m',
    message: (
      <>
        Hey <span>@james</span> and <span>@julia</span> here's the final copy for the homepage.
      </>
    ),
  },
  1: {
    avatar: julia,
    name: 'Julia Efes',
    timeAgo: '5m',
    message: <>Looks great! Maybe we should change it to ‘commenting’?</>,
  },
  2: {
    avatar: james,
    name: 'James Hanson',
    timeAgo: 'Just now',
    message: <>Agreed, I think it describes the product better</>,
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
        height: '982px',
      }}
    >
      <h1 ref={reference} className={styles.h1} style={{ paddingRight: '300px' }}>
        {title}
      </h1>
      <h3 style={{ padding: '0px 80px', marginLeft: '-480px', textAlign: 'left' }}>
        {description}
      </h3>
      <GetStartedButton style={{ marginLeft: '-900px', marginTop: '0px' }} />
      <div
        ref={floating}
        style={{
          position: context.strategy,
          left: context.x ?? 0,
          top: context.y ?? 0,
          marginTop: -115,
          marginLeft: -360,
        }}
      >
        <Message message={messages[0]} />
        <div style={{ margin: '150px 0' }} />
        <Message message={messages[1]} />
        <div style={{ margin: '16px 0' }} />
        <Message message={messages[2]} />
      </div>
    </section>
  );
}
