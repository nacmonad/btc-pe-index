import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {bang, updateData} from '../../actions';

import EnhancedTable from '../EnhancedTable';
import Selects from '../Selects'

const styles = {
  display: 'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
}

const inputA =
  { title:'Items',
    items: [
      10,
      20,
      50,
     100,
    1000
    ]
  }

const inputB =
    { title:'Currency',
      items: [
        'USD',
        'EUR',
        'CAD'
      ]
    }

class Main extends Component {
  componentDidMount() {
      this.fetchData();
  }
  handleChange() {
    console.log("bangeroo")
  }
  fetchData() {
    if (this.props.params === undefined) this.props.params = {currency:'USD', items:100}
    fetch(`https://api.coinmarketcap.com/v1/ticker/?convert=${this.props.params.currency}&limit=${this.props.params.items}`, {
        method: 'GET',
      })
      .then((res)=>res.json())
      .then((data)=>{
        return data.map((r)=>{
          return {
            ...r,
            price:parseFloat(r.price_usd),
            supply:parseFloat(r.available_supply),
            market_cap_usd:parseFloat(r.market_cap_usd),
            btcpe: (parseFloat(r.price_usd)*parseFloat(r.total_supply)/parseFloat(data[0].total_supply)).toFixed(2).toString()
          }
        })
      })
      .then((data)=>{
        this.props.updateData(data);
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <div style={{display:'flex', justifyContent:'flex-start'}}>
            <Selects input={inputA} fetchData={this.fetchData.bind(this)}/>
            <Selects input={inputB} fetchData={this.fetchData.bind(this)}/>
        </div>
        <div style={styles}>


          {/*<Table data={this.props.main.data.marketcap}/>*/}
          <EnhancedTable data={this.props.main.data.marketcap} params={this.props.main.params}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    main:state.main,
    router:state.router,
    params:state.main.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ bang, updateData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
