import React from 'react';
import { GetStartedButton } from './GetStartedButton';
import checkmarkSvg from '../assets/checkmark.svg';
import { card, li, ul } from '../styles/Home.css';
import { V12 } from '../UIKit';
import { vars } from '../styles/Theme.css';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { RequestDemoButton } from './RequestDemoButton';

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

export const PLANS = (
  <>
    <div className={card}>
      <h4>Starter</h4>
      <V12 />
      <h2>
        Free
        <br />
      </h2>
      <V12 />
      <small>Per month</small>
      <V12 />

      <FeatureList>
        <h5>
          10 <br />
          <small>workspaces</small>
        </h5>
        <h5>All the essentials</h5>
        <h5>Customize UI</h5>
      </FeatureList>
      <small>$5 per additonal workspace.</small>
      <V12 />
      <GetStartedButton
        type="secondary"
        style={{
          display: 'flex',
          width: '100%',
        }}
      />
    </div>
    <div className={card}>
      <h4 style={{ color: vars.color.teal }}>Startup</h4>
      <V12 />
      <h2>
        $100 <br />
      </h2>
      <V12 />
      <small>Per month</small>
      <V12 />
      <FeatureList>
        <h5>
          30 <br />
          <small>workspaces</small>
        </h5>
        <h5>All the essentials</h5>
        <h5>Customize UI</h5>
      </FeatureList>
      <small>$5 per additonal workspace.</small>
      <V12 />
      <RequestDemoButton
        style={{
          display: 'flex',
          width: '100%',
          background: vars.color.teal,
          color: 'white',
        }}
      />
    </div>
    <div className={card}>
      <h4 style={{ color: vars.color.indigo }}>Pro</h4>
      <V12 />
      <h2>
        $450 <br />
      </h2>
      <V12 />
      <small>Per month</small>
      <V12 />
      <FeatureList>
        <h5>
          100 <br />
          <small>workspaces</small>
        </h5>
        <h5>All the essentials</h5>

        <h5>Customize UI</h5>
        <h5>Slack Support</h5>
      </FeatureList>
      <small>$5 per additional workspace.</small>
      <V12 />
      <RequestDemoButton
        style={{
          display: 'flex',
          width: '100%',
          background: vars.color.indigo,
          color: 'white',
        }}
      />
    </div>
    <div className={card}>
      <h4 style={{ color: vars.color.violet }}>Enterprise</h4>
      <V12 />
      <h2>Custom</h2>
      <br />
      <br />
      <FeatureList>
        <h5>
          Unlimited <br />
          <small>workspaces</small>
        </h5>
        <h5>All the essentials</h5>
        <h5>Customize UI</h5>
        <h5>Slack Support</h5>
        <h5>Custom Components</h5>
        <h5>SOC 2</h5>
        <h5>SLA</h5>
      </FeatureList>
      <br />
      <br />
      <V12 />
      <RequestDemoButton
        style={{
          width: '100%',
          textAlign: 'center',
          backgroundColor: vars.color.violet,
          color: 'white',
        }}
      />
    </div>
  </>
);

export function Plans() {
  const { ref } = useHeaderStyle({
    backgroundColor: vars.color.ice,
    theme: 'light',
  });

  return (
    <section ref={ref} style={{ background: vars.color.ice }} id="Pricing">
      <h1>Pricing</h1>
      <h3 style={{ color: '#8093A7' }}>Packages that grow with your business</h3>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexDirection: 'row',
          marginTop: '60px',
          maxWidth: 1124,
        }}
      >
        {PLANS}
      </div>
    </section>
  );
}
