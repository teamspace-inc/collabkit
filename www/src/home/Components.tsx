import React, { useEffect } from 'react';
import { dark, vars } from '../styles/Theme.css';
import * as styles from '../styles/home/Demos.css';
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
    <Thread.Provider threadId="thread3">
      <div
        style={{
          marginLeft: '-12px',
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
      <div style={{ position: 'relative', left: 4 }}>
        <InternalPopoverThreadThread />
      </div>
    </Thread.Provider>
  );
}

export const COMPONENTS: ComponentProps[] = [
  {
    title: 'Thread',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: (
      <div style={{ width: 256, height: 320 }}>
        <Thread threadId="thread3" />
      </div>
    ),
  },
  {
    title: 'PopoverThread',
    description: 'A comment thread that anchors to a component in your app.',
    component: (
      <div style={{ display: 'flex', marginTop: '8px' }}>
        <PopoverThreadComponent />
      </div>
    ),
  },
  {
    title: 'Inbox',
    description: 'A list of all the threads you are participating in.',
    component: (
      <div
        style={{
          marginTop: '60px',
          overflow: 'hidden',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Inbox />
      </div>
    ),
  },
];

function Component(props: ComponentProps) {
  return (
    <div className={component}>
      <div className={card}>{props.component}</div>
      <div style={{ textAlign: 'left', marginTop: '16px' }}>
        <h4 className={componentTitle}>{props.title}</h4>
        <p className={componentDescription}>{props.description}</p>
      </div>
    </div>
  );
}

export function Components() {
  const size = useWindowSize();

  return (
    // turns out you cant put the carousel in a container with]
    // display: flex, flex-direction: column, and overflow: hidden
    <>
      <section className={`${dark} ${purpleBg}`} style={{ paddingBottom: 40, paddingTop: 40 }}>
        <h1>React components</h1>
        <h3 className={styles.h3}>Build your commenting system with ease</h3>
      </section>
      <div style={{ background: vars.color.aubergine }} className={dark}>
        <Carousel
          style={{
            // position so it's centered on the screen
            padding: `0px ${((size?.width ?? 0) - 1124) / 2}px`,
            gap: 40,
          }}
          slides={[
            <Component {...COMPONENTS[0]} />,
            <Component {...COMPONENTS[1]} />,
            <Component {...COMPONENTS[2]} />,
            <div
              className={card}
              style={{
                borderRadius: '24px',
                border: '1px solid #4A3A63',
                gap: '20px',
              }}
            >
              <h4 className={componentTitle}>See more components</h4>
              <Link href="/docs" className={button({ type: 'secondary', size: 'medium' })}>
                Documentation
              </Link>
            </div>,
          ]}
        />
      </div>
      <div style={{ height: 80, background: vars.color.aubergine }} />
    </>
  );
}
