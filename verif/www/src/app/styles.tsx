export const ButtonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px',
  border: '1px solid #2D302F',
  borderRadius: '8px',
  gap: '8px',
  background: 'none',
};

export const ButtonHoverStyle: React.CSSProperties = {
  background: '#2D302F',
  cursor: 'pointer',
};

export const ButtonTextStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: '12px',
  color: 'white',
  lineHeight: '20px',
};

export const ButtonIconStyle: React.CSSProperties = {
  position: 'relative',
  top: '1px',
};

export const MainStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  display: 'grid',
  gridTemplateColumns: '284px 1fr',

  // to inset with a max width uncomment these styles
  // border: '1px solid #2D302F',
  // borderRadius: '8px',
  // maxWidth: 960,
  // margin: '40px auto',
  minHeight: '100vh',
};

export const MessageStyle: React.CSSProperties = {
  background: '#2D302F',
  border: '1px solid #2D302F',
  borderRadius: '8px',
  padding: '4px 12px',
  fontSize: 15,
  lineHeight: '28px',
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'Inter, sans-serif',
};

export const OutputStyle: React.CSSProperties = {
  ...MessageStyle,
  background: 'transparent',
};

export const AgentProcessingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

export const AgentOutputStyle: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  fontFamily: 'Menlo, monospace',
  color: '#929896',
  fontSize: 12,
  lineHeight: '20px',
};

export const AnswerStyle: React.CSSProperties = {
  ...MessageStyle,
  background: 'transparent',
};

export const MessageListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px 24px',
  gap: 12,
  flex: 0,
  marginTop: 12,
  width: '100%',
  maxWidth: '652px',
};

export const InputStyle: React.CSSProperties = {
  ...MessageStyle,
  backgroundColor: '#2D302F',
  color: 'rgba(255, 255, 255, 0.9)',
  border: 'none',
  marginTop: '12px',
  borderRadius: '8px',
  outline: 'none',
  width: '100%',
};

export const CursorStyle: React.CSSProperties = {
  width: '2px',
  height: '1em',
  position: 'relative',
  top: '0.25em',
  background: 'rgba(255,255,255,0.9)',
  display: 'inline-block',
};

export const HiddenStyle: React.CSSProperties = {
  display: 'none',
};

export const SpacerStyle: React.CSSProperties = {
  flex: 1,
};

export const FormStyle: React.CSSProperties = {
  display: 'flex',
  padding: '10px 20px 20px',
  background: '#151817',
  position: 'sticky',
  bottom: 0,
  marginTop: 20,
  width: '100%',
  maxWidth: '652px',
};

export const ConnectionStyle: React.CSSProperties = {
  position: 'fixed',
  top: 24,
  right: 24,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(255,255,255,0.5)',
};

export const ListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #2D302F',
};

export const ListItemStyle: React.CSSProperties = {
  display: 'flex',
  padding: 16,
  flexDirection: 'column',
  gap: '12px',
  borderBottom: '1px solid #2D302F',
};

export const ListItemHoverStyle: React.CSSProperties = {
  background: '#1D1F1F',
  cursor: 'pointer',
};

export const ListItemHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
};

export const UnverifiedStyle: React.CSSProperties = {
  color: '#FBCC64',
  fontSize: '12px',
  lineHeight: '15px',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
};

export const VerifiedStyle: React.CSSProperties = {
  color: '#5BA97D',
  fontSize: '12px',
  lineHeight: '15px',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
};

export const TimestampStyle: React.CSSProperties = {
  color: '#929896',
  fontSize: '12px',
  display: 'flex',
  lineHeight: '15px',
  gap: '8px',
};

export const ListItemQuestionStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  color: 'white',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
};

export const ListHeaderStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  height: 52,
  padding: 16,
  color: 'white',
  borderBottom: '1px solid #2D302F',
};

export const QueryDetailViewStyle: React.CSSProperties = {
  display: 'flex',
  padding: 16,
  flexDirection: 'column',
  gap: '16px',
};

export const QuestionStyle: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '18px',
  color: 'white',
};

export const DividerStyle: React.CSSProperties = {
  background: '#2D302F',
  width: '100%',
  height: '1px',
  display: 'flex',
};

export const ChartWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const SQLStyle: React.CSSProperties = {
  fontFamily: 'Menlo, monospace',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: 12,
  border: '1px solid #2D302F',
  lineHeight: '20px',
  padding: 16,
};

export const ActionBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};
