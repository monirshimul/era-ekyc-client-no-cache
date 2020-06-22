import React, { Component } from 'react';


import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import Dashboard from './component/Dashboard/Dashboard';

import Login from './component/Login/Login';
import ForgetPass from './component/E-KYC/User/Password/ForgetPass';
import VerifyId from './component/E-KYC/User/Password/VerifyId';
import VerifyPassCode from './component/E-KYC/User/Password/VerifyPassCode';
import VerifyLoginCode from './component/Login/code/VerifyLoginCode';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  
  handleTabClose= (ev)=>{
    localStorage.removeItem('accountId');
    ev.preventDefault();
    ev.returnValue = '';
    
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.handleTabClose);
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.handleTabClose);
  }

  render() {
    return (
      <Provider store={store}>


        <Router >
          <div className="App">

            <Switch>


              <Route exact path="/" component={Login} />
              <Route exact path="/forget-pass" component={ForgetPass} />
              <Route exact path="/verify-id" component={VerifyId} />
              <Route exact path="/verify-pass-code" component={VerifyPassCode} />
              <Route exact path="/verify-login" component={VerifyLoginCode} />
              <Route path="/dashboard" component={Dashboard} />








            </Switch>
            <NotificationContainer />


          </div >
        </Router >
      </Provider>



    );
  }

}

export default App;
