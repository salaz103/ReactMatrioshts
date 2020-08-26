import React from 'react';

const Action = (props) => (
  <div>
    <button
      className="big-button"
      onClick={props.action}
    >
      {props.nombre}
      </button>
  </div>
);

export default Action;
