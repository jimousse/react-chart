import React, { useRef, useEffect, useState } from 'react';
import LineChart from './LineChart';
import Axis from './Axis';
import { scaleLinear } from 'd3';

import './_container.scss';

const fontFamily = 'Lato';
const fontSize = 10;

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
  for (let i = 0; i < 11; i++) {
    const value = domain[0] + i*tickInterval;
    const position = xScale(value);
    ticks.push({
      label: Math.round(value * 10) / 10,
      position,
      index: i*10
    });
  }
  return ticks;
};


export default function Container() {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);
  const [ height, setHeight ] = useState(0);
  const [ width, setWidth ] = useState(0);
  const [ ticks, setTicks ] = useState([]);
  const [ chartWidth, setChartWidth ] = useState(0);
  const [ axisSizing, setAxisSizing ] = useState(0);
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

    if (canvasRef.current) {
      const _ticks = pickTicks(_xScale);
      // do ticks measuring
      const measuringCanvas = canvasRef.current;
      const ctx = measuringCanvas.getContext('2d');
      ctx.font = `${fontSize}px ${fontFamily}`;
      _ticks.forEach(t => {
          t.width = ctx.measureText(t.label).width;
      });
      setTicks(_ticks);
      const _leftOffset = _ticks[0].width/2;
      const _rightOffset = _ticks[_ticks.length - 1].width/2;
      const _chartWidth = newWidth - _leftOffset -_rightOffset;
      _xScale.range([ 0, _chartWidth ]);
      setChartWidth(_chartWidth);
      setAxisSizing({
        width: _chartWidth,
        left: _leftOffset,
        right: _rightOffset
      });
    }

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
  return (
    <div className="chart-container">
      <div
        ref={parentRef}
        className="chart-area-container">
        <LineChart
          xScale={xScale}
          yScale={yScale}
          height={height}
          width={chartWidth}
          left={axisSizing.left}
          data={data}
          color={'salmon'}
        />
      </div>
      <div className="axis-container">
        <Axis
          sizing={axisSizing}
          ticks={ticks}
        />
      </div>
      <canvas ref={canvasRef} id="canvas-measure" />
    </div>
  );
}