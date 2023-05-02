import { $getRoot, $getSelection, EditorState, EditorThemeClasses } from 'lexical';
import { LexicalComposer, InitialConfigType } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import './index.less';

const Placeholder: React.FC = () => {
  return <div className="editor-placeholder">Play around with the horizontal rule plugin...</div>;
};

const Editor = () => {
  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    onError: (error) => {
      console.error(error);
    },
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
