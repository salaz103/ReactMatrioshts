import React from 'react';

const Action = (props) => (
  <div>
    <button
      className="big-button"
      onClick={props.traducir}
    >
      Traducir
      </button>
  </div>
);

export default Action;
