import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Dashboard from './component/Dashboard/Dashboard';

import Login from './component/Login/Login';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>


        <Router>
          <div className="App">

            <Switch>


              <Route exact path="/" component={Login} />

              <Route path="/dashboard" component={Dashboard} />








            </Switch>


          </div >
        </Router >
      </Provider>



    );
  }

}

export default App;
