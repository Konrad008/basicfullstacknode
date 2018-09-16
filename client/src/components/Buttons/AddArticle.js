import React, { Component } from "react";
import { FormModal } from "../Modals/FormModal";
import connect from "react-redux/es/connect/connect";
import { toast } from "react-toastify";

const mapStateToProps = state => {
  const { categories } = state.category;
  return { categories };
};

class AddArticle extends Component {
  handleClick(e) {
    e.preventDefault();
    if (this.props.categories.length !== 0) {
      this.FormModal.openModal();
    } else {
      toast.error(
        "Aby można było dodawać pomoce naukowe przynajmniej jedna kategoria musi być aktywna!"
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <FormModal ref={instance => (this.FormModal = instance)} />
        <button
          onClick={e => this.handleClick(e)}
          type="submit"
          className="btn btn-info btn-lg float-right"
        >
          Dodaj pomoc
        </button>
      </React.Fragment>
    );
  }
}

const ConnectedAddArticle = connect(
  mapStateToProps,
  null
)(AddArticle);

export { ConnectedAddArticle as AddArticle };
