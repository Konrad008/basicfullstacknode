import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userActions.logout())
  };
};

class Logout extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return <button onClick={e => this.handleClick(e)} type="submit" className="btn btn-primary btn-lg float-right">Wyloguj</button>
  }
}

const LogoutConnected = connect(
  null,
  mapDispatchToProps
)(Logout);



export { LogoutConnected as Logout };