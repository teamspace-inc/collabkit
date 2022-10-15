import { useIsSmallScreen } from './useIsSmallScreen';
import * as styles from '../styles/Hero.css';
import { vars } from '../styles/Theme.css';

const messages = {
  0: {
    name: 'Alicia Baker',
    timeAgo: '10m',
    message: (
      <>
        Hey <span>@james</span> and <span>@julia</span> here's the final copy for the homepage.
      </>
    ),
  },
  1: {
    name: 'Julia Efes',
    timeAgo: '5m',
    message: <>Looks great! Maybe we should change it to ‘commenting’?</>,
  },
  2: {
    name: 'James Hanson',
    timeAgo: 'Just now',
    message: <>Agreed, I think it describes the product better</>,
  },
};

function Message(props: { message: typeof messages[keyof typeof messages] }) {
  return (
    <div className={styles.message}>
      <div className={styles.avatar}></div>
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

  return (
    <section style={{ background: vars.color.yellow, paddingTop: 240 }}>
      <h1 className={styles.h1}>{title}</h1>
      <h3>{description}</h3>
      <Message message={messages[0]} />
      <Message message={messages[1]} />
      <Message message={messages[2]} />
    </section>
  );
}
