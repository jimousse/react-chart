import React, { useRef, useEffect, useState } from 'react';
import Line from './Line';
import { line, bisector } from 'd3';
import './_line-chart.scss';


export default function LineChart(props) {
  const lineContainerRef = useRef(null);
  const [ hoveredPoint, setHoveredPoint ] = useState(null);
  const { data, xScale, yScale } = props;

  const handleMouseOver = (e) => {
    const { offsetX, clientY } = e;
    const xValue = xScale.invert(offsetX);
    const fn = bisector(d => d.x).left;
    const test = fn(data, xValue);
    setHoveredPoint(`datapoint_${test}`);
  };

  const handleMouseOut = (e) => {
    setHoveredPoint(null);
  };

  useEffect(() => {
    if (!lineContainerRef.current) return;
    lineContainerRef.current.addEventListener('mousemove', handleMouseOver);
    lineContainerRef.current.addEventListener('mouseout', handleMouseOut);

    return () => {
      if (!lineContainerRef.current) return;
      lineContainerRef.current.removeEventListener('mousemove', handleMouseOver);
      lineContainerRef.current.removeEventListener('mouseout', handleMouseOut);
    };
  }, [ handleMouseOver ]);

  if (!xScale || !yScale) return null;


  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  const d = lineGenerator(data);
  return (
    <div
      style={{ width: props.width, marginLeft: props.left }}
      ref={lineContainerRef}
      className="line-container">
      {data.map(({ x, y }, i) => {
          const id = `datapoint_${i}`;
          const classes = [ 'datapoint' ];
          if (id === hoveredPoint) {
            classes.push('hover');
          }
          return (
            <span
              id={id}
              className={classes.join(' ')}
              style= {{ left: xScale(x), top: yScale(y) }}
            />
          );
      })}
      <svg
        style={{ height: '100%', width: '100%' }}
      >
        <Line path={d} color={props.color} />
      </svg>
    </div>
  );
}