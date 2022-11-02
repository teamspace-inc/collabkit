import { ThemeProvider, ThemeWrapper, Profile } from '@collabkit/react';
import { vars } from '../../styles/Theme.css';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer, DocLink } from '../Doc';
import React from '../react.types';

export function AdvancedDisclaimer(props: { componentName: string }) {
  return (
    <blockquote>
      <h4 style={{ marginTop: 0 }}>Advanced</h4>
      This doc covers how to render an individual {props.componentName}. In most cases you'll want
      to use a higher level component like <DocLink href="/docs/components/thread">Thread</DocLink>{' '}
      or <DocLink href="/docs/components/popoverthread">PopoverThread</DocLink> directly.
    </blockquote>
  );
}

const Spacer24 = <div style={{ height: 24 }} />;

export function AdvancedPart(props: {
  code: string;
  description: React.ReactNode;
  title: React.ReactNode;
  demo?: React.ReactNode;
  props?: React.ReactNode;
}) {
  return (
    <AdvancedSubsection>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      {props.demo ? (
        <>
          <AdvancedDemo>{props.demo}</AdvancedDemo>
          {Spacer24}
        </>
      ) : null}
      {renderCodeSnippet(props.code, [[1, 2]])}
      {props.props ? (
        <>
          <br />
          <h4>Props</h4>
          {props.props}
        </>
      ) : null}
    </AdvancedSubsection>
  );
}

export function AdvancedDemo(props: { children: React.ReactNode }) {
  return (
    <DocDemoContainer style={{ padding: '40px', background: vars.color.bgContrastLow }}>
      <ThemeProvider theme="dark">
        <ThemeWrapper>{props.children}</ThemeWrapper>
      </ThemeProvider>
    </DocDemoContainer>
  );
}

export function AdvancedSubsection(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        border: `1px solid ${vars.color.bgContrastLow}`,
        // background: vars.color.bgContrastLow,
        borderRadius: '12px',
      }}
    >
      {props.children}
    </div>
  );
}
