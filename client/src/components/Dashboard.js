import React, { Component } from "react";
import { List, AddArticle, Logout, Categories } from "./index";
import connect from "react-redux/es/connect/connect";
import { categoryActions } from "../redux/actions";

const mapStateToProps = state => {
  const { user } = state.authentication;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(categoryActions.getAll())
  };
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <div className="row dsmainpage">
        <div className="col-md-6 dswelcome">
          <h1>Pomoce Dydaktyczne SP23</h1>
        </div>
        <div className="col-md-6 dsnav">
          <Logout />
          <AddArticle />
          <Categories />
        </div>
        <div className="col-md-12 dstable">
          <List />
        </div>
      </div>
    );
  }
}

const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export { ConnectedDashboard as Dashboard };
