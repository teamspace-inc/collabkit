import React from 'react';
import { dark } from '../styles/Theme.css';
import * as styles from '../styles/home/Demos.css';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { InternalPopoverThread, Inbox, Thread } from '@collabkit/react';
import {
  component,
  card,
  componentDescription,
  componentTitle,
} from '../styles/home/Components.css';
import { button } from '../styles/Website.css';
import { Link } from 'wouter';

type ComponentProps = {
  title: string;
  description: string;
  component: React.ReactNode;
};

const components: ComponentProps[] = [
  {
    title: 'Thread',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: (
      <div style={{ width: 256, height: 292 }}>
        <Thread threadId="thread3" />
      </div>
    ),
  },
  {
    title: 'PopoverThread',
    description: 'A comment thread that anchors to a component in your app.',
    component: (
      <div style={{ display: 'flex', marginTop: '8px' }}>
        <div
          style={{
            marginTop: '00px',
            padding: '9px 4px',
            marginRight: '4px',
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
        <div style={{ height: 'auto' }}>
          <InternalPopoverThread threadId={'thread2'} autoFocus={false} />
        </div>
      </div>
    ),
  },
  {
    title: 'Inbox',
    description: 'A list of all the threads you are participating in.',
    component: (
      <div
        style={{
          marginTop: '52px',
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

export function Components(props: { setInvertFilter: (invert: number) => void }) {
  return (
    <section
      className={`${dark} ${styles.section}`}
      style={{ padding: '60px 0px' }}
      id="Components"
    >
      <h1>React components</h1>
      <h3 className={styles.h3}>Build your commenting system with ease</h3>
      <CarouselProvider
        naturalSlideWidth={520}
        naturalSlideHeight={500}
        totalSlides={5}
        visibleSlides={window.innerWidth / 500}
        // figure out padding for site
        style={{
          width: '100%',
          marginTop: '20px',
        }}
      >
        <Slider>
          {/* empty slide to act as left margin */}
          <Slide index={0} style={{ width: (window.innerWidth - 1124) / 2 }} />
          {components.map((component, index) => (
            <Slide key={index} index={index} style={{ outline: 'none' }}>
              <Component {...component} />
            </Slide>
          ))}
          <Slide index={4}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                borderRadius: '24px',
                background: '#2E2739',
                gap: '20px',
              }}
            >
              <h4 className={componentTitle}>See more components</h4>
              <Link href="/docs" className={button({ type: 'secondary', size: 'medium' })}>
                Documentation
              </Link>
            </div>
          </Slide>
        </Slider>
      </CarouselProvider>
    </section>
  );
}
