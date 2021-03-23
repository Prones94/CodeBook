import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value:string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue}) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current= monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    })
  monacoEditor.getModel()?.updateOptions({ tabSize: 2});
  };

  const onFormatClick = () => {
    const unformattedValue = editorRef.current.getModel().getValue();

    const formattedValue = prettier.format(unformattedValue, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    });
    editorRef.current.setValue(formattedValue);
  }
  return (
    <div>
      <button onClick={onFormatClick}>Make it Pretty</button>
      <MonacoEditor
        language="javascript"
        editorDidMount={onEditorDidMount}
        value= {initialValue}
        height="500px"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: {enabled: false},
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize:16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
    )
}

export default CodeEditor;