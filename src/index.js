
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';

const style = {
  height: '150px',
  width: '400px',
  margin: '30px',
  resize: 'both',
  overflow: 'auto'
};
ReactDOM.render(
  <div style={style}>
    <Container />
  </div>,
  document.getElementById('root')
);

module.hot.accept();