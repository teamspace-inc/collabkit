import { dark, vars } from '../../styles/Theme.css';
import { button, h3OnPurple, purpleBg, vertical20, vertical40 } from '../../styles/Website.css';

import ThreadSvg from '../../assets/home/components/Thread.svg';
import PopoverThreadSvg from '../../assets/home/components/PopoverThread.svg';
import InboxSvg from '../../assets/home/components/Inbox.svg';
import { componentDescription, componentTitle } from '../../styles/home/Components.css';

import * as styles from '../../styles/home/Components.css';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';

const components = [
  {
    title: 'Thread',
    description: 'A comment thread that can be rendered anywhere in your app.',
    svg: <img src={ThreadSvg} />,
  },
  {
    title: 'Popover Thread',
    description: 'A comment thread that anchors to a component in your app.',
    svg: <img src={PopoverThreadSvg} />,
  },
  {
    title: 'Inbox',
    description: 'See all comment threads in one place.',
    svg: <img style={{ marginTop: 60 }} src={InboxSvg} />,
  },
];

export function SmallComponents() {
  const { ref } = useHeaderStyle({ backgroundColor: vars.color.aubergine, theme: 'dark' });

  return (
    <section ref={ref} className={`${dark} ${purpleBg}`} id="Components">
      <div className={vertical40}>
        <div className={vertical20}>
          <h1>React components</h1>
          <h3 className={h3OnPurple}>Build your commenting system with ease</h3>
        </div>
        <div className={vertical40}>
          {components.map((component, i) => (
            <div className={vertical20} key={i}>
              <div className={styles.card}>{component.svg}</div>
              <div style={{ textAlign: 'left', alignSelf: 'flex-start' }}>
                <h3 style={{ fontWeight: 600 }} className={componentTitle}>
                  {component.title}
                </h3>
                <p className={componentDescription}>{component.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={button({ type: 'secondary', size: 'medium' })}>Find out more</button>
      </div>
    </section>
  );
}
