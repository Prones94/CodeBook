import {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions'

import './css/text-editor.css'

interface TextEditorProps {
  cell: Cell
}

const TextEditor:React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref= useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(ref.current && event.target && ref.current.contains(event.target as Node)) {
        console.log('element is clicked inside the editor')
        return;
      }
      console.log('element clicked is outside the editor')
      setEditing(false);
    };
    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, {capture: true});
    }
  }, []);

  if(editing){
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={cell.content} onChange={(text) => updateCell(cell.id, text || '')}/>
      </div>
    )
  };

  return (
  <div className="text-editor" onClick={() => setEditing(true)}>
    <div className="card-content">
      <MDEditor.Markdown source={cell.content || 'Click to Edit Markdown'} />

    </div>
  </div>
  )
};

export default TextEditor;