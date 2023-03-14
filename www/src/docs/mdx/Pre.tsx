import React from 'react';

type CodeMeta = {
  highlightLines?: string;
};

export const CodeMetaContext = React.createContext<CodeMeta>({});

export const Pre = ({
  children,
  highlightLines,
}: React.ComponentPropsWithoutRef<'pre'> & CodeMeta) => {
  return (
    <CodeMetaContext.Provider
      value={{
        highlightLines,
      }}
    >
      <pre>{children}</pre>
    </CodeMetaContext.Provider>
  );
};
