import React, { Component } from "react";
import { history } from "./services/history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { alertActions } from "./redux/actions";
import { PrivateRoute, RegisterPage, Dashboard, LoginPage } from "./components";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

class AppRouter extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
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
