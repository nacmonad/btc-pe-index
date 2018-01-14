import React, { Component } from 'react';

const styles = {
  display: 'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
}

class Main extends Component {

  render() {
    return (
      <div style={styles}>
        <p>About</p>
      </div>
    );
  }
}

export default Main;
