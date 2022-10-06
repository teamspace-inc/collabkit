import React from 'react';
import { RequestDemoButton } from './Home';
import checkmarkSvg from '../assets/checkmark.svg';
import { card, li, ul } from '../styles/Home.css';

function FeatureList(props: { children: React.ReactNode }) {
  return (
    <ul className={ul}>
      {React.Children.map(props.children, (child) => {
        return (
          <li className={li}>
            <img src={checkmarkSvg} style={{ width: '1rem', height: '20px', marginTop: '0' }} />
            {child}
          </li>
        );
      })}
    </ul>
  );
}

const Spacing = (props: { h: number }) => <div style={{ height: props.h }} />;
const S12 = () => <Spacing h={12} />;
const S24 = () => <Spacing h={24} />;

export function Plans() {
  return (
    <section>
      <h1>Pricing</h1>
      <h3>Packages that grow with your business.</h3>
      <div style={{ display: 'flex', gap: '40px', flexDirection: 'row' }}>
        <div className={card}>
          <h4>Startup</h4>
          <S12 />
          <h2>
            $400 <br />
            <small>Per month</small>
          </h2>
          <FeatureList>
            <h5>All the essentials</h5>
            <h5>
              1,000 <br />
              <small>monthly active users</small>
            </h5>
            <h5>Customize UI</h5>
          </FeatureList>
          <small>$0.10 per additonal user.</small>
          <S12 />
          <RequestDemoButton style={{ display: 'flex', width: '100%' }} />
        </div>
        <div className={card}>
          <h4>Pro</h4>
          <S12 />
          <h2>
            $800 <br />
            <small>Per month</small>
          </h2>
          <FeatureList>
            <h5>All the essentials</h5>
            <h5>
              5,000 <br />
              <small>monthly active users</small>
            </h5>
            <h5>Customize UI</h5>
            <h5>Shared Slack Channel</h5>
          </FeatureList>
          <small>$0.10 per additonal user.</small>
          <S12 />
          <RequestDemoButton style={{ width: '100%', textAlign: 'center' }} />
        </div>
        <div className={card}>
          <h4>Scale</h4>
          <S12 />
          <h2>
            Custom
            <br />
            <br />
          </h2>
          <FeatureList>
            <h5>All the essentials</h5>
            <h5>
              Unlimited <br />
              <small>monthly active users</small>
            </h5>
            <h5>Customize UI</h5>
            <h5>Shared Slack Channel</h5>
            <h5>API</h5>
            <h5>SLA</h5>
          </FeatureList>
          <S12 />
          <RequestDemoButton style={{ width: '100%', textAlign: 'center' }} />
        </div>
      </div>
    </section>
  );
}
