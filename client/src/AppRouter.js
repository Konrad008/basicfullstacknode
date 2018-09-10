import React, { Component } from "react";
import { history } from './services/history';
import { alertActions } from './redux/actions';
import {
  PrivateRoute,
  RegisterPage,
  Dashboard,
  LoginPage
} from "./components";
import {
  Router,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }
  render() {
    const { alert } = this.props;
    return (
      <div className="container-fluid">
        <div className="col-sm-12">
          {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
        </div>
        <Router history={history}>
          <React.Fragment>
            <Route exact path="/" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(AppRouter);
export { connectedApp as AppRouter };