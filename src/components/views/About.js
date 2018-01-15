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
        <p>The Bitcoin Price Equivalence Index is the value a coin would be if it had the same current supply as Bitcoin's.</p>
        <p>This server scrapes and archives the marketcap data from <a href="http://www.coinmarketcap.com/" target="_blank">http://www.coinmarketcap.com</a>.  The intent is to eventually provide a volatility indication service and use archived data to devise potentially useful metrics for training trading bots.</p>
      </div>
    );
  }
}

export default Main;
