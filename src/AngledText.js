import React, { useRef, useEffect, useState } from 'react';
import './_angled-text.scss';

const rad = (deg) => {
  return deg * Math.PI / 180;
};

const rotatedDimension = (l, L, angleDegrees = 0) => {
  return {
    l_rot: l * Math.sin(Math.PI/2 - rad(angleDegrees)),
    L_rot: L * Math.sin(rad(angleDegrees))
  };
};



export default function AngledText(props) {
  const { angle, height, width, label } = props;
  const { L_rot, l_rot } = rotatedDimension(height, width, angle);
  const transform = `translate(-50%, 0) rotate(-${angle}deg)`;
  const padding = `${(L_rot + l_rot) / 2}px 0`;
  const margin = `0px -${L_rot/2}px`;
  return (
    <div 
      className="container" 
      style={{
        // margin
      }}>
      <div className="one">
        <div 
          className="two"
          style={{ padding }}
        >
          <span 
            className="text"
            style= {{ transform }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}