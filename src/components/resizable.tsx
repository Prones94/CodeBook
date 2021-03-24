import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';
import './css/resizable.css';

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth]  = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if(window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener)
    };
  }, [width])

  if (direction === 'horizontal'){
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles:['e'],
      minConstraints: [innerWidth * 0.2,Infinity],
      maxConstraints: [innerHeight * 0.8, Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      height:300,
      width:Infinity,
      resizeHandles:['s'],
      minConstraints:[Infinity, innerHeight * 0.1],
      maxConstraints:[Infinity, innerHeight * 0.9],
    };
  }
  return (
    <ResizableBox {...resizableProps}>
    {children}
    </ResizableBox>)
}

export default Resizable