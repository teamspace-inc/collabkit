import { ThemeProvider, ThemeWrapper } from '@collabkit/react';
import { advancedAnatomyPartNumber } from '../../styles/Docs.css';
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

export type AdvancedPropRow = [React.ReactNode, React.ReactNode, React.ReactNode];

export function AdvancedProps(props: { rows: AdvancedPropRow[]; hideHeader?: boolean }) {
  return (
    <table>
      {props.hideHeader ? null : (
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
      )}
      <tbody>
        {props.rows.map((row) => (
          <tr>
            <td style={{ verticalAlign: 'top', maxWidth: 175 }}>
              <code>{row[0]}</code>
            </td>
            <td style={{ verticalAlign: 'top', maxWidth: 225 }}>
              <code style={{ color: vars.color.textContrastMedium }}>{row[1]}</code>
            </td>
            <td style={{ maxWidth: 320, verticalAlign: 'top', fontSize: 14 }}>{row[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AdvancedPart(props: {
  code: string;
  description: React.ReactNode;
  title: React.ReactNode;
  demo?: React.ReactNode;
  props?: React.ReactNode;
}) {
  return (
    <AdvancedSubsection>
      <h4 className={advancedAnatomyPartNumber}>{props.title}</h4>
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
    <DocDemoContainer
      style={{
        padding: '20px 40px',
        borderColor: vars.color.bgContrastMedium,
        borderWidth: 1,
        borderStyle: 'solid',
        background: 'transparent',
      }}
    >
      <ThemeProvider theme="dark">
        <ThemeWrapper>{props.children}</ThemeWrapper>
      </ThemeProvider>
    </DocDemoContainer>
  );
}

export function AdvancedHeroDemo(props: { children: React.ReactNode }) {
  return (
    <DocDemoContainer style={{ padding: '64px 60px', background: vars.color.bgContrastLow }}>
      <ThemeProvider theme="dark">
        <ThemeWrapper>{props.children}</ThemeWrapper>
      </ThemeProvider>
    </DocDemoContainer>
  );
}

const style: React.CSSProperties = {
  padding: '0px 72px 0px 0px',
  position: 'relative',
  left: 44,
  background: vars.color.bgContrastLowest,
  marginBottom: '40px',
};

export function AdvancedSubsection(props: { children: React.ReactNode }) {
  return <div style={style}>{props.children}</div>;
}
