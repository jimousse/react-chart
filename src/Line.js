import React from 'react';

export default function Line(props) {
  return <path stroke={props.color} d={props.path} fill="transparent" />;
}