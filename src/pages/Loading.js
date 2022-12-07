import React from 'react';
import '../CSS/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <h1 className="lds-hourglass">Loading</h1>
      </div>
    );
  }
}

export default Loading;
