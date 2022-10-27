import * as styles from '../styles/home/Hero.css';

import james from '../assets/james.png';
import alicia from '../assets/alicia.png';
import check from '../assets/home/hero/Check.svg';

export const HERO_MESSAGES = {
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
  2: {
    avatar: check,
    name: 'Done',
    timeAgo: '',
    message: null,
  },
};

export function HeroMessage(props: { message: typeof HERO_MESSAGES[keyof typeof HERO_MESSAGES] }) {
  return (
    <div className={styles.message}>
      <img src={props.message.avatar} className={styles.avatar} />
      <div className={styles.messageInner}>
        <div className={styles.name}>
          {props.message.name} <span className={styles.timeAgo}>{props.message.timeAgo}</span>
        </div>
        {props.message.message ? <div className={styles.body}>{props.message.message}</div> : null}
      </div>
    </div>
  );
}
