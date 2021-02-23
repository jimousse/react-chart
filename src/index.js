
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';

const style = {
  height: '500px',
  width: '700px',
  resize: 'both',
  overflow: 'auto',
  border: '3px solid red',
  boxSizing: 'border-box'
};
ReactDOM.render(
  <div style={style}>
    <Container />
  </div>,
  document.getElementById('root')
);

module.hot.accept();