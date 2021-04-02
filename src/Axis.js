import React, { useRef } from 'react';
import './_axis.scss';


export default function Axis(props) {
  const axisContainerRef = useRef();
  const { ticks, sizing } = props;
  const { width, left } = sizing;

  if (ticks.length === 0) return null;

  return (
    <div
      className="axis"
      style={{ width, marginLeft: `${left}px` }}
      ref={axisContainerRef}
    >
      <div width={props.width} className="axis-line" />
      <div className="ticks">
        <div className="invisible-tick">Test</div>
        {ticks.map((t, i) => {
          let index = t.index;
          return (
            <span
              key={i}
              className="tick"
              style={{ left: `${index}%`, top: '0px' }}
            >
              <span className="tick-label">{t.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}