// import { CollabKitProvider } from '@collabkit/react';
import { CodeEditor } from './CodeEditor';
import { useEffect, useState } from 'react';

import { transform } from '@babel/standalone';
import { CustomTheme } from './types';

// function plugin({ types: t }: { types: any }) {
//   return {
//     visitor: {
//       ExportDefaultDeclaration(path: any) {
//         path.replaceWith(t.returnStatement(path.node.declaration));
//       },
//     },
//   };
// }

// registerPlugin('plugin', plugin);

function parseCode(codeString: string) {
  try {
    const { code } = transform(codeString, {
      filename: 'index.tsx',
      presets: ['typescript', 'react'],
      plugins: [],
    });
    return code;
  } catch (err) {
    console.error('Error parsing code: ', err);
    return '';
  }
}

export function ThemeEditor() {
  const [code, setCode] = useState(
    () => `import type { CustomTheme } from '@collabkit/react';
    
const customTheme: CustomTheme = {
    radii: { 0: '4px', composer: '8px' },
    fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '32px', button: '12px' },
    lineHeights: { 0: '18.36px', 1: '22.4px' },
    fontWeights: {
      2: 500,
      3: 700,
      button: 600,
      mention: 600,
      mentionDropdownItemMark: 600,
      profileNameText: 600,
    },
    sizes: {
      avatar: '32px',
    },
    padding: {
      commentTop: 0,
      commentBottom: 0,
      commentLeft: 0,
      commentRight: 0,
    },
    borders: {
      composer: '1px solid #36B374',
  
      buttonPrimary: '',
      buttonSecondary: '',
      buttonTertiary: '',
  
      buttonPrimaryActive: '',
      buttonSecondaryActive: '',
      buttonTertiaryActive: '',
  
      buttonPrimaryHover: '',
      buttonSecondaryHover: '',
      buttonTertiaryHover: '',
    },
    space: {
      commentHeaderBodyGap: '12px',
    },
    shadows: {
      mentionDropdownBoxShadow:
        '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
    },
    colors: {
      sendButtonColor: '#36B374',
      sendButtonDisabledColor: '#E3E9ED',
      sendButtonTextColor: 'white',
      sendButtonDisabledTextColor: '#B4BDC2',
      buttonPrimaryBackground: '#36B374',
  
      mentionText: '#007FF5',
      mentionDropdownMarkBackground: 'none',
      mentionDropdownTextColor: 'black',
  
      buttonPrimaryText: 'white',
      buttonPrimaryHoverBackground:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #36B374',
      buttonPrimaryHoverText: 'white',
  
      buttonPrimaryActiveBackground:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #36B374',
      buttonPrimaryActiveText: 'white',
  
      buttonSecondaryBackground: 'transparent',
      buttonSecondaryText: '#6A7278',
  
      buttonTertiaryBackground: 'white',
      buttonTertiaryText: '#6A7278',
  
      buttonTertiaryHoverBackground: 'rgba(0, 0, 0, 0.05)',
      buttonTertiaryActiveBackground: 'rgba(0, 0, 0, 0.1)',
  
      buttonDisabledText: '#B4BDC2',
      buttonDisabledBackground: '#E3E9ED',
  
      backgroundColor: 'white',
      composerBackground: 'white',
      composerPlaceholder: '#6A7278',
      primaryText: 'black',
      secondaryText: '#6A7278',
      caretColor: 'black',
      indicatorLineColor: 'rgba(0,0,0,0.1)',
    },
    offsets: {},
  };
  `
  );

  useEffect(() => {
    try {
      const fn = Function(`return () => { ${parseCode(code)}; return customTheme; }`)();
      console.log(fn() as CustomTheme);
    } catch (e) {
      console.error(e);
    }
  }, [code]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <CodeEditor code={code} scrollbar={true} onChange={setCode} />
      <div>Preview here</div>
    </div>
  );
}
