import React from 'react';
import { GetStartedButton } from './GetStartedButton';
import checkmarkSvg from '../assets/checkmark.svg';
import { card, li, ul } from '../styles/Home.css';
import { V12 } from '../UIKit';
import { vars } from '../styles/Theme.css';

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

export function Plans() {
  return (
    <section style={{ background: '#F0F4F8' }} id="Pricing">
      <h1>Pricing</h1>
      <h3>Packages that grow with your business.</h3>
      <div style={{ display: 'flex', gap: '40px', flexDirection: 'row' }}>
        <div className={card}>
          <h4>Free</h4>
          <V12 />
          <h2>
            $0 <br />
          </h2>
          <V12 />
          <V12 />
          <FeatureList>
            <h5>All the essentials</h5>
            <h5>
              150 <br />
              <small>monthly active users</small>
            </h5>
            <h5>Customize UI</h5>
          </FeatureList>
          <small>$0.10 per additonal user.</small>
          <V12 />
          <GetStartedButton
            style={{
              display: 'flex',
              width: '100%',
              background: vars.color.textContrastHigh,
              color: 'white',
            }}
          />
        </div>
        <div className={card}>
          <h4>Pro</h4>
          <V12 />
          <h2>
            $95 <br />
          </h2>
          <V12 />
          <small>Per month</small>
          <V12 />
          <FeatureList>
            <h5>All the essentials</h5>
            <h5>
              1,000 <br />
              <small>monthly active users</small>
            </h5>
            <h5>Customize UI</h5>
          </FeatureList>
          <small>$0.10 per additonal user.</small>
          <V12 />
          <GetStartedButton
            style={{
              display: 'flex',
              width: '100%',
              background: vars.color.indigo,
              color: 'white',
            }}
          />
        </div>
        <div className={card}>
          <h4>Scale</h4>
          <V12 />
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
          <V12 />
          <GetStartedButton
            style={{
              width: '100%',
              textAlign: 'center',
              backgroundColor: vars.color.violet,
              color: 'white',
            }}
          />
        </div>
      </div>
    </section>
  );
}
