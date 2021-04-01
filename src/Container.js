import React, { useRef, useEffect, useState } from 'react';
import LineChart from './LineChart';
import Axis from './Axis';
import { scaleLinear, line } from 'd3';

import './_container.scss';

const data = [];

for (let i = 0; i < 101; i++) {
  data.push({ x: i, y: Math.random()*100 });
}

let max = -Infinity;
let min = Infinity;
data.forEach(({ x, y }) => {
  if (y >= max) max = y;
  if (y <= min) min = y;
});


const pickTicks = (xScale) => {
  if (!xScale) return [];
  const domain = xScale.domain();
  const domainLength = domain[1] - domain[0];
  const tickInterval = domainLength / 10;
  let ticks = [];
  for (let i = 0; i <  11; i++) {
    const value = domain[0] + i*tickInterval;
    const position = xScale(value);
    ticks.push({
      label: Math.round(value * 10) / 10,
      position
    });
  }
  return ticks;
};


export default function Container() {
  const parentRef = useRef(null);
  const [ height, setHeight ] = useState(0);
  const [ width, setWidth ] = useState(0);
  const [ xScale, setXScale ] = useState(() => {});
  const [ yScale, setYScale ] = useState(() => {});

  useEffect (() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      if (newHeight === height && newWidth === width) return;
      const _xScale = scaleLinear()
        .domain([ 0 , data[data.length - 1].x ])
        .range([ 0, newWidth ]);
      const _yScale = scaleLinear()
        .domain([ min , max ])
        .range([ newHeight, 0 ]);

      setXScale(() => _xScale);
      setYScale(() => _yScale);
      setWidth(newWidth);
      setHeight(newHeight);
    });

    if(parentRef && parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, [ parentRef, xScale, yScale ]);

  pickTicks(xScale);
  return (
    <div className="chart-container">
      <div ref={parentRef} className="line-container">
        <LineChart
          xScale={xScale}
          yScale={yScale}
          height={height}
          width={width}
          data={data}
          color={'salmon'}
        />
      </div>
      <div className="axis-container">
        <Axis
          ticks={pickTicks(xScale)}
        />
      </div>
    </div>
  );
}