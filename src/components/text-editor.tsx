import {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor';

import './css/text-editor.css'

const TextEditor:React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header')
  const ref= useRef<HTMLDivElement | null>(null);

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
        <MDEditor value={value} onChange={(text) => setValue(text || '')}/>
      </div>
    )
  };

  return (
  <div className="text-editor" onClick={() => setEditing(true)}>
    <div className="card-content">
      <MDEditor.Markdown source={value} />

    </div>
  </div>
  )
};

export default TextEditor;