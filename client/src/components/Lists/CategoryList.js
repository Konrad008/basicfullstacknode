import React, { Component } from "react";
import { connect } from "react-redux";
import {categoryActions} from "../../redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(categoryActions.getAll()),
    deleteCategory: (id) => dispatch(categoryActions._delete(id)),
    editCategory: (category) => dispatch(categoryActions.editShow(category))
  };
};

const mapStateToProps = state => {
  const { categories } = state.category;

  return { categories };
};

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  deleteStuff(e, id) {
    e.preventDefault();
    this.props.deleteCategory(id);
  }

  editStuff(e, category) {
    e.preventDefault();
    this.props.editCategory(category);
  }

  render() {
    return (
      <ol>
        {this.props.categories.map((category, index) =>
          <li className={'mli'} key={index}>
            <span>{category.category}</span>
            <br />
            <button
              className="btn btn-danger btn-sm mdelete"
              onClick={e => this.deleteStuff(e, category.id)}
            >
              Kasuj
            </button>
            <button
              className="btn btn-primary btn-sm medit"
              onClick={e => this.editStuff(e, category)}
            >
              Edytuj
            </button>
          </li>
        )}
      </ol>
    )
  }

}

const ConnectedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

export {ConnectedList as CategoryList};