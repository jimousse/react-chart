import React, { useRef, useEffect, useState } from 'react';
import './_axis.scss';
import { lineHeightNormal } from './font-metrics';


const _ticks = [];
const tickHeight = lineHeightNormal * 10;
const fontFamily = 'Times New Roman';
const fontSize = 10;

export default function Axis(props) {
  const canvasRef = useRef();
  const axisContainerRef = useRef();
  const { ticks } = props;


  useEffect(() => {
    if (!canvasRef.current) return;

    // do ticks measuring
    const measuringCanvas = canvasRef.current;
    const ctx = measuringCanvas.getContext('2d');
    ctx.font = `${fontSize}px ${fontFamily}`;
    ticks.forEach(t => {
        t.width = ctx.measureText(t.label).width;
    });
    
  });

  if (ticks.length === 0) return null;

  return (
    <div 
      className="axis" 
      ref={axisContainerRef}
    >
      <div className="axis-line"></div>
      <div className="ticks">
        {ticks.map((t, i) => {
          let left = t.position;
          return (
            <span 
              key={i} 
              className="tick"
              style={{
                left: `${left}px`,
                top: '0px'
              }}
            >
              <span className="tick-label">{t.label}</span>
            </span>  
          );
        })}
      </div>
      <canvas ref={canvasRef} id="canvas-measure" />
    </div>
  );
}