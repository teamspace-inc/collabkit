import LogoSvgs from '../assets/logos.svg';
import LogoVerticalSvgs from '../assets/logosVerticla.svg';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

import React, { useEffect } from 'react';
import { dark, vars } from '../styles/Theme.css';
import * as styles from '../styles/home/TrustedBy.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Inbox, Thread, usePopoverThread, InternalPopoverThreadThread } from '@collabkit/react';
import {
  component,
  card,
  componentDescription,
  componentTitle,
} from '../styles/home/Components.css';
import { Carousel } from '../Carousel';
import { Link } from 'wouter';
import { button, purpleBg } from '../styles/Website.css';
import { useWindowSize } from '../hooks/useWindowSize';
import { text } from 'packages/@collabkit/theme/src/styles/comment/systemMessageStyles';
import zack from '../assets/home/testimonials/zack.png';
import matthew from '../assets/home/testimonials/matthew.png';
import michiel from '../assets/home/testimonials/michiel.png';

type ComponentProps = {
  title: string;
  description: string;
  component: React.ReactNode;
};

function PopoverThreadComponent() {
  const objectId = 'object3';

  const { openPopover } = usePopoverThread({
    objectId,
  });

  useEffect(() => {
    openPopover();
  }, []);

  return (
    <Thread.Provider threadId="thread4" autoFocus={false}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <div
          style={{
            padding: '9px 4px',
            width: '100px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            borderRadius: '6px',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'rgba(0,0,0,0.3)',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Component
        </div>
        <div style={{ position: 'relative', left: 0 }}>
          <InternalPopoverThreadThread />
        </div>
      </div>
    </Thread.Provider>
  );
}

type TestimonialProps = { profilePicture: string; name: string; title: string; text: string };

export const TESTIMONIALS: TestimonialProps[] = [
  {
    profilePicture: matthew,
    name: 'Matthew Haber',
    title: 'CEO & Co-founder Cofactr',
    text: 'In-app collaborative commenting had been on our to-do list, working with CollabKit has allowed us to get this implemented. Helping our users much faster than trying to build it ourselves.',
  },

  {
    profilePicture: michiel,
    name: 'Michiel Westerbeek',
    title: 'Tella Co-founder',
    text: 'CollabKit takes away the hard work of setting up an advanced commenting experience and lets us focus on the core of our product instead.',
  },

  {
    profilePicture: zack,
    name: 'Zack Swafford',
    title: 'Dart Co-founder',
    text: 'Collabkit has helped us move at warp speed and add the exact features our product needed without the engineering effort.',
  },
];

function Testimonial(props: TestimonialProps) {
  return (
    <div className={styles.slide}>
      <div className={styles.card}>
        <div className={styles.profile}>
          <img className={styles.profilePicture} src={props.profilePicture} />
          <div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.title}>{props.title}</div>
          </div>
        </div>
        <div className={styles.text}>{props.text}</div>
      </div>
    </div>
  );
}

export function TrustedBy() {
  const size = useWindowSize();

  return (
    // turns out you cant put the carousel in a container with]
    // display: flex, flex-direction: column, and overflow: hidden
    <>
      <section className={`${dark} ${purpleBg}`} style={{ paddingBottom: 40, paddingTop: 40 }}>
        <h1>Trusted by</h1>
      </section>
      <div style={{ background: vars.color.aubergine }} className={dark}>
        <Carousel
          style={{
            // position so it's centered on the screen
            padding: '0 20px',
            gap: 40,
            maxWidth: 'min-content',
            margin: '0 auto',
          }}
          slides={[
            <Testimonial {...TESTIMONIALS[0]} />,
            <Testimonial {...TESTIMONIALS[1]} />,
            <Testimonial {...TESTIMONIALS[2]} />,
          ]}
        />
      </div>
      <div style={{ height: 80, background: vars.color.aubergine }} />
    </>
  );
}
