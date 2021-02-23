import React from 'react';
import { scaleLinear, line } from 'd3';
import Line from './Line';


export default function LineChart(props) {
  const { data, width, height } = props;

  const xScale = scaleLinear()
  .domain([ 0 , data[data.length - 1].x ])
  .range([ 0, width ]);

  const yScale = scaleLinear()
  .domain([ 0 , data[data.length - 1].y ])
  .range([ height, 0 ]);

  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  const d = lineGenerator(data);

  return (
    <svg
      height={props.height}
      width={props.width}
      style={{ verticalAlign: 'middle' }} // to prevent infinite growing loop
    >
      <Line path={d} color={props.color} />
    </svg>
  );
}