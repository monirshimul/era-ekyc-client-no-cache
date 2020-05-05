import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Dashboard from './component/Dashboard/Dashboard';

import Login from './component/Login/Login';
import ForgetPass from './component/E-KYC/User/Password/ForgetPass';
import VerifyId from './component/E-KYC/User/Password/VerifyId';
import VerifyPassCode from './component/E-KYC/User/Password/VerifyPassCode';
import VerifyLoginCode from './component/E-KYC/User/code/VerifyLoginCode';
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
              <Route exact path="/forget-pass" component={ForgetPass} />
              <Route exact path="/verify-id" component={VerifyId} />
              <Route exact path="/verify-pass-code" component={VerifyPassCode} />
              <Route exact path="/verify-login-code" component={VerifyLoginCode} />
              <Route path="/dashboard" component={Dashboard} />








            </Switch>


          </div >
        </Router >
      </Provider>



    );
  }

}

export default App;
