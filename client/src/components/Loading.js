import React from 'react';
import { Spinner } from 'reactstrap';

function Loading() {
  return (
    <div className="overlay">
      <div className="d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    </div>
  );
}

export default Loading;
