import React from 'react';
import { dark, vars } from '../styles/Theme.css';
import * as styles from '../styles/home/Demos.css';
import { SidebarComments, Thread } from '@collabkit/react';
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

export const COMPONENTS: ComponentProps[] = [
  {
    title: 'SidebarComments',
    description: 'Comments sidebar that accessible from anywhere in your app.',
    component: (
      <div
        style={{
          marginTop: '40px',
          overflow: 'hidden',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <SidebarComments defaultOpen={true} style={{ width: 320, height: 376 }} />
      </div>
    ),
  },
  {
    title: 'Thread',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: (
      <div style={{ width: 256, height: 320 }}>
        <Thread
          style={{ width: 256, height: 320, borderRadius: 6 }}
          threadId="thread3"
          autoFocus={false}
        />
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
        <h3 className={styles.h3} style={{ marginBottom: 40 }}>
          Build your commenting system with ease
        </h3>
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
            <div
              className={card}
              style={{
                borderRadius: '24px',
                background: 'transparent',
                border: '1px solid #4A3A63',
                gap: '20px',
              }}
            >
              <h4 className={componentTitle}>See more components</h4>
              <Link href="/docs" className={button({ type: 'secondary', size: 'large' })}>
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
