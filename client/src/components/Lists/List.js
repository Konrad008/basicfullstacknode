import React, { Component } from "react";
import { connect } from "react-redux";
import { crudActions } from "../../redux/actions/index";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {DetailsModal, FormModal} from "../index";

const mapStateToProps = state => {
  const { articles } = state.crudReducer;
  return { articles };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticles: () => dispatch(crudActions.getArticles()),
    deleteArticle: id => dispatch(crudActions.deleteArticle(id)),
    editArticle: stuff => dispatch(crudActions.editArticle(stuff))
  };
};

class List extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  deleteStuff(e, id) {
    e.preventDefault();
    confirmAlert({
      title: "Skasować?",
      message: "Czy jesteś pewien że chcesz skasować ten wpis?",
      buttons: [
        {
          label: "Tak",
          onClick: () => this.props.deleteArticle(id)
        },
        {
          label: "Nie"
        }
      ]
    });
  }

  editStuff(e, stuff) {
    e.preventDefault();
    this.props.editArticle(stuff);
  }

  render() {
    const columns = [
      {
        Header: "Nazwa",
        accessor: "name",
        filterable: true
      },
      {
        Header: "Opis",
        accessor: "description",
        show: false
      },
      {
        Header: "Użytkownik",
        accessor: "user",
        filterable: true
      },
      {
        Header: "Kategoria",
        accessor: "category",
        filterable: true
      },
      {
        Header: "Ilość",
        accessor: "quantity",
        filterable: true
      },
      {
        Header: "Edytuj",
        accessor: "edit",
        sortable: false,
        resizable: false,
        width: 70,
        Cell: props => (
          <button
            className="btn btn-success btn-sm tablebuttons"
            onClick={e => {this.editStuff(e, props.original); this.EditModal.openModal();}}
          >
            Edytuj
          </button>
        ) // Custom cell components!
      },
      {
        Header: "Kasuj",
        accessor: "delete",
        sortable: false,
        resizable: false,
        width: 70,
        Cell: props => (
          <button
            className="btn btn-danger btn-sm tablebuttons"
            onClick={e => this.deleteStuff(e, props.original.id)}
          >
            Kasuj
          </button>
        )
      }
    ];
    return (
      <React.Fragment>
        <ReactTable
          defaultPageSize={18}
          data={this.props.articles}
          columns={columns}
          getTdProps={(state, rowInfo, column) => {
            return {
              onClick: (e, handleOriginal) => {
                if(column.Header !== "Kasuj" && column.Header !== "Edytuj" && rowInfo) {
                  this.DetailsModal.openModal(rowInfo.original);
                }
              }
            };
          }}
        />
        <DetailsModal ref={instance => this.DetailsModal = instance}/>
        <FormModal ref={instance => this.EditModal = instance}/>
      </React.Fragment>
    );
  }
}

const ConnectedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ConnectedList as List };
