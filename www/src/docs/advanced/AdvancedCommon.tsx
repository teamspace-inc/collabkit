import { ThemeProvider, ThemeWrapper } from '@collabkit/react';
import { advancedAnatomyPartNumber, navListItem } from '../../styles/Docs.css';
import { vars } from '../../styles/Theme.css';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer, DocLink } from '../Doc';

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

export function AdvancedProps(props: {
  props: AdvancedPropRow[];
  optionalProps?: AdvancedPropRow[];
}) {
  return (
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        {props.props.map((row, i) => (
          <tr key={`row-${i}`}>
            <td style={{ verticalAlign: 'top', maxWidth: 175 }}>
              <code>{row[0]}</code>
            </td>
            <td style={{ verticalAlign: 'top', maxWidth: 225 }}>
              <code style={{ color: vars.color.textContrastMedium }}>{row[1]}</code>
            </td>
            <td style={{ verticalAlign: 'top', maxWidth: 320, fontSize: 14 }}>{row[2]}</td>
          </tr>
        ))}
      </tbody>
      {props.optionalProps ? (
        <>
          <thead>
            <tr>
              <th>Optional</th>
            </tr>
          </thead>
          <tbody>
            {props.optionalProps.map((row, i) => (
              <tr key={`row-${i}`}>
                <td style={{ verticalAlign: 'top', maxWidth: 175 }}>
                  <code>{row[0]}</code>
                </td>
                <td style={{ verticalAlign: 'top', maxWidth: 225 }}>
                  <code style={{ color: vars.color.textContrastMedium }}>{row[1]}</code>
                </td>
                <td style={{ verticalAlign: 'top', maxWidth: 320, fontSize: 14 }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </>
      ) : null}
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
    <DocDemoContainer style={{ padding: '16px' }}>
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
  marginBottom: '40px',
};

export function AdvancedSubsection(props: { children: React.ReactNode }) {
  return <div style={style}>{props.children}</div>;
}
