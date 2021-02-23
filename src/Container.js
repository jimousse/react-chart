import React, { useRef, useEffect, useState } from 'react';
import LineChart from './LineChart';

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 }
];


export default function Container() {
  const parentRef = useRef(null);
  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);

  useEffect ( () => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setHeight(height);
      setWidth(width);
    });

    if(parentRef && parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, [ parentRef ]);

  return (
    <div
      ref={parentRef}
      style={{
        height: '100%',
        backgroundColor: 'teal',
        width: '100%'
      }}
    >
      <LineChart
        height={height}
        width={width}
        data={data}
        color={'salmon'}
      />
    </div>
  );
}