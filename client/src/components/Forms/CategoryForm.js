import React, { Component } from "react";
import { connect } from "react-redux";
import { categoryActions } from "../../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(categoryActions.getAll()),
    clearCategory: () => dispatch(categoryActions.clear()),
    addCategory: category => dispatch(categoryActions.add(category)),
    editCategory: category => dispatch(categoryActions.edit(category))
  };
};

const mapStateToProps = state => {
  const { category } = state.category;
  return { category };
};

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: false,
      category: "",
      uid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.id !== props.category.id) {
      return {
        id: props.category.id,
        category: props.category.category,
        uid: props.category.uid
      };
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    this.props.clearCategory();
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  doClearState() {
    this.setState({
      id: false,
      category: "",
      submitted: false,
      uid: false
    });
  }

  handleClear() {
    this.doClearState();
    this.props.clearCategory();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });

    if (this.state.category) {
      if (!this.state.id) {
        this.props.addCategory({ category: this.state.category });
        this.doClearState();
      } else {
        this.props.editCategory({ ...this.state });
        this.doClearState();
      }
    }
  }

  render() {
    return (
      <form
        ref={instance => {
          this.form = instance;
        }}
      >
        <div className="form-group">
          {this.state.id === false ?
            (<label htmlFor="name">Dodaj kategorię!</label>) :
            (<label htmlFor="name">Edytuj kategorię!</label>)}
          <input
            type="text"
            name="category"
            className="form-control"
            id="category"
            value={this.state.category}
            onChange={this.handleChange}
          />
          {this.state.submitted &&
            !this.state.category && (
              <div className="help-block">Pole obowiązkowe!</div>
            )}
        </div>
        {this.state.id === false ? (
          <button
            type="submit"
            onClick={e => this.handleSubmit(e)}
            className="btn btn-primary btn-lg"
          >
            Zapisz
          </button>
        ) : (
          <React.Fragment>
            <button
              type="submit"
              onClick={e => this.handleSubmit(e)}
              className="btn btn-success btn-lg"
            >
              Edytuj
            </button>
            <button
              onClick={() => this.handleClear()}
              className="btn btn-danger btn-lg"
            >
              Anuluj
            </button>
          </React.Fragment>
        )}
      </form>
    );
  }
}

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(CategoryForm);

export { ConnectedForm as CategoryForm };
