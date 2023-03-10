import { ThemeProvider } from '@collabkit/react';
import { useEffect, useState } from 'react';
import * as styles from '../styles/docs/Docs.css';
import React from 'react';
import { ApplyTheme, ThemeEditor } from './ThemeEditor';
import {
  themeEditorDialogOverlay,
  themeEditorModal,
  themeEditorModalContent,
  themeEditorModalPreview,
} from '../styles/ThemeEditor.css';
import { Dialog, DialogContent } from './Dialog';

export function ComponentDemo({
  children,
  hideThemeEditorButton = false,
  title = 'Theme Editor',
  ...props
}: {
  children: React.ReactNode;
  hideThemeEditorButton?: boolean;
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      document.body.setAttribute('style', 'height: 100vh; overflow: hidden;');
      return () => {
        document.body.setAttribute('style', 'overflow: auto;');
      };
    }
  }, [isEditing]);

  return (
    <ThemeProvider theme="dark">
      <div {...props} className={styles.componentDemo}>
        {children}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent
            className={themeEditorModal}
            dialogOverlayClassName={themeEditorDialogOverlay}
          >
            <div onClick={(e) => e.stopPropagation()} className={themeEditorModalContent}>
              <div className={themeEditorModalPreview}>
                <ApplyTheme>{children}</ApplyTheme>
              </div>
              <ThemeEditor style={{ height: '100%' }} />
            </div>
          </DialogContent>
        </Dialog>
        {hideThemeEditorButton ? null : (
          <button onClick={() => setIsEditing(true)} className={styles.themeEditorButton}>
            Theme Editor
          </button>
        )}
      </div>
    </ThemeProvider>
  );
}
