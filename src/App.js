import React, { Component } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers

import Header from './components/Header';
import Main from './components/views/Main';
import About from './components/views/About';
import Donate from './components/views/Donate';
import Footer from './components/Footer';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
  combineReducers({
    main: reducers,
    router: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware),

)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         { /* ConnectedRouter will use the store from Provider automatically */ }
         <ConnectedRouter history={history}>
           <div>
               <Header/>
               <Route exact path="/" component={Main}/>
               <Route path="/about" component={About}/>
               <Route path="/donate" component={Donate}/>
               <Footer/>
           </div>
         </ConnectedRouter>
       </Provider>
    );
  }
}

export default App;
