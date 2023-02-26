import type { editor } from 'monaco-editor';

export const CollabKitMonacoTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    {
      background: '2C2C2C',
      token: '',
    },
    {
      foreground: 'BBBBBB',
      fontStyle: 'italic',
      token: 'comment',
    },
    {
      foreground: 'FFEC6B',
      fontStyle: 'regular',
      token: 'comment.block.preprocessor',
    },
    {
      foreground: '999999',
      fontStyle: 'regular italic',
      token: 'comment.documentation',
    },
    {
      foreground: '999999',
      fontStyle: 'regular italic',
      token: 'comment.block.documentation',
    },
    {
      foreground: 'a61717',
      background: 'e3d2d2',
      token: 'invalid.illegal',
    },
    {
      fontStyle: 'regular',
      token: 'keyword',
    },
    {
      fontStyle: 'regular',
      token: 'storage',
    },
    {
      fontStyle: 'regular',
      token: 'keyword.operator',
    },
    {
      fontStyle: 'regular',
      token: 'constant.language',
    },
    {
      fontStyle: 'regular',
      token: 'support.constant',
    },
    {
      foreground: '445588',
      fontStyle: 'regular',
      token: 'storage.type',
    },
    {
      foreground: '445588',
      fontStyle: 'regular',
      token: 'support.type',
    },
    {
      foreground: 'FFEC6B',
      token: 'entity.other.attribute-name',
    },
    {
      foreground: '000000',
      token: 'variable.other',
    },
    {
      foreground: '999999',
      token: 'variable.language',
    },
    {
      foreground: '445588',
      fontStyle: 'regular',
      token: 'entity.name.type',
    },
    {
      foreground: '445588',
      fontStyle: 'regular',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: '445588',
      fontStyle: 'regular',
      token: 'support.class',
    },
    {
      foreground: 'FFEC6B',
      fontStyle: 'regular',
      token: 'variable.other.constant',
    },
    {
      foreground: 'FFEC6B',
      token: 'constant.character.entity',
    },
    {
      foreground: '990000',
      token: 'entity.name.exception',
    },
    {
      foreground: '990000',
      token: 'entity.name.function',
    },
    {
      foreground: '990000',
      token: 'support.function',
    },
    {
      foreground: '990000',
      token: 'keyword.other.name-of-parameter',
    },
    {
      foreground: '555555',
      token: 'entity.name.section',
    },
    {
      foreground: 'FFEC6B',
      token: 'entity.name.tag',
    },
    {
      foreground: 'FFEC6B',
      token: 'variable.parameter',
    },
    {
      foreground: 'FFEC6B',
      token: 'support.variable',
    },
    {
      foreground: '009999',
      token: 'constant.numeric',
    },
    {
      foreground: '009999',
      token: 'constant.other',
    },
    {
      foreground: 'dd1144',
      token: 'string - string source',
    },
    {
      foreground: 'dd1144',
      token: 'constant.character',
    },
    {
      foreground: '009926',
      token: 'string.regexp',
    },
    {
      foreground: '990073',
      token: 'constant.other.symbol',
    },
    {
      fontStyle: 'regular',
      token: 'punctuation',
    },
    {
      foreground: '000000',
      background: 'ffdddd',
      token: 'markup.deleted',
    },
    {
      fontStyle: 'italic',
      token: 'markup.italic',
    },
    {
      foreground: 'aa0000',
      token: 'markup.error',
    },
    {
      foreground: '999999',
      token: 'markup.heading.1',
    },
    {
      foreground: '000000',
      background: 'ddffdd',
      token: 'markup.inserted',
    },
    {
      foreground: '888888',
      token: 'markup.output',
    },
    {
      foreground: '888888',
      token: 'markup.raw',
    },
    {
      foreground: '555555',
      token: 'markup.prompt',
    },
    {
      fontStyle: 'regular',
      token: 'markup.regular',
    },
    {
      foreground: 'aaaaaa',
      token: 'markup.heading',
    },
    {
      foreground: 'aa0000',
      token: 'markup.traceback',
    },
    {
      fontStyle: 'underline',
      token: 'markup.underline',
    },
    {
      foreground: '999999',
      background: 'eaf2f5',
      token: 'meta.diff.range',
    },
    {
      foreground: '999999',
      background: 'eaf2f5',
      token: 'meta.diff.index',
    },
    {
      foreground: '999999',
      background: 'eaf2f5',
      token: 'meta.separator',
    },
    {
      foreground: '999999',
      background: 'ffdddd',
      token: 'meta.diff.header.from-file',
    },
    {
      foreground: '999999',
      background: 'ddffdd',
      token: 'meta.diff.header.to-file',
    },
    {
      foreground: '4183c4',
      token: 'meta.link',
    },
  ],
  colors: {
    'editor.foreground': '#ffffff',
    'editor.background': 'transparent',
    'editor.selectionBackground': '#3D3D3D',
    'editor.inactiveSelectionBackground': '#222222',
    'editor.lineHighlightBackground': '#444444',
    'editorCursor.foreground': '#FFEC6B',
    'editorWhitespace.foreground': '#222222',
  },
};

// console.log(JSON.stringify(CollabKitMonacoTheme));
