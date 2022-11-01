const ThreadIndicator = () => (
  <span
    style={{
      position: 'absolute',
      top: -2,
      right: -2,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 8px 8px 0',
      borderColor: `transparent ${'blue'} transparent transparent`,
    }}
  />
);
