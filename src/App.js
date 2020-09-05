import React, { Component, Suspense, lazy } from 'react';


import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { Provider } from 'react-redux';
import store from './store';




import PageLoader from './component/Page-Loader/PageLoader'
//import Login from './component/Login/Login';
const Login = lazy(()=> import('./component/Login/Login'));
//import Dashboard from './component/Dashboard/Dashboard';
const Dashboard = lazy(() => import('./component/Dashboard/Dashboard'));
const ForgetPass = lazy(() => import('./component/E-KYC/User/Password/ForgetPass'));
const VerifyId = lazy(() => import('./component/E-KYC/User/Password/VerifyId'));
const VerifyPassCode = lazy(() => import('./component/E-KYC/User/Password/VerifyPassCode'));
const VerifyLoginCode = lazy(() => import('./component/Login/code/VerifyLoginCode'));

// import VerifyId from './component/E-KYC/User/Password/VerifyId';
// import VerifyPassCode from './component/E-KYC/User/Password/VerifyPassCode';
// import VerifyLoginCode from './component/Login/code/VerifyLoginCode';


class App extends Component {

  handleTabClose = (ev) => {
    sessionStorage.removeItem('accountId');
    ev.preventDefault();
    ev.returnValue = '';

  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleTabClose);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleTabClose);
  }

  render() {
    return (
      <Provider store={store}>


        <Router >

          <Suspense fallback={<PageLoader/>}>
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
          </Suspense>
        </Router >




      </Provider>



    );
  }

}

export default App;
