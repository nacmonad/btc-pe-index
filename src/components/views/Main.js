import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { updateData } from '../../actions';

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
        'CAD',
        'GBP',
        'JPY'
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
            price_usd:parseFloat(r.price_usd),
            price_eur:parseFloat(r.price_eur),
            price_cad:parseFloat(r.price_cad),
            price_gbp:parseFloat(r.price_gbp),
            price_jpy:parseFloat(r.price_jpy),
            supply:parseFloat(r.available_supply),
            market_cap_usd:parseFloat(r.market_cap_usd),
            market_cap_eur:parseFloat(r.market_cap_eur),
            market_cap_cad:parseFloat(r.market_cap_cad),
            market_cap_gbp:parseFloat(r.market_cap_gbp),
            market_cap_jpy:parseFloat(r.market_cap_jpy),
            btcpe: (parseFloat(r[`price_${this.props.params.currency.toLowerCase()}`])*parseFloat(r.total_supply)/parseFloat(data[0].total_supply)).toFixed(2)
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
  return bindActionCreators({ updateData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
