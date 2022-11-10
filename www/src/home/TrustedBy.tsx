import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { dark } from '../styles/Theme.css';
import * as styles from '../styles/home/TrustedBy.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Carousel } from '../Carousel';
import { purpleBg } from '../styles/Website.css';
import zack from '../assets/home/testimonials/zack.png';
import matthew from '../assets/home/testimonials/matthew.png';
import michiel from '../assets/home/testimonials/michiel.png';
import Logos2VSvg from '../assets/logos2v.svg';
import Logos2Svg from '../assets/logos2.svg';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';

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
  const { ref } = useHeaderStyle({ theme: 'dark', backgroundColor: '#24202B' });
  const isSmallScreen = useIsSmallScreen();

  return (
    // turns out you cant put the carousel in a container with]
    // display: flex, flex-direction: column, and overflow: hidden
    <>
      <section
        ref={ref}
        className={`${dark} ${purpleBg}`}
        style={{ paddingBottom: 80, backgroundColor: '#24202B' }}
      >
        <h1 style={{ fontSize: 48, lineHeight: '38px' }}>Trusted by</h1>
      </section>
      <div style={{ background: '#24202B' }} className={dark}>
        <Carousel
          style={{
            // position so it's centered on the screen
            padding: isSmallScreen ? '0 40px' : '0 20px',
            gap: isSmallScreen ? 20 : 40,
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
      <div
        style={{
          background: '#24202B',
          height: isSmallScreen ? '360px' : '185px',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <img src={isSmallScreen ? Logos2VSvg : Logos2Svg} />
      </div>
    </>
  );
}
