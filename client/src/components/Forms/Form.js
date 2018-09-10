import React, {Component} from "react";
import {connect} from "react-redux";
import {
  categoryActions,
  crudActions,
  userActions
} from "../../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(crudActions.sendArticles(article)),
    clearForm: () => dispatch(crudActions.clearForm()),
    getUsers: () => dispatch(userActions.getAll()),
    getCategories: () => dispatch(categoryActions.getAll())
  };
};

const mapStateToProps = state => {
  const {post} = state.crudReducer;
  const {users} = state;
  const {user} = state.authentication;
  const {categories} = state.category;
  return {post, users, user, categories};
};

class Form extends Component {
  constructor(props) {
    super(props);
    if (!this.props.post.id) {
      this.state = {
        id: this.props.post.id,
        name: this.props.post.name,
        description: this.props.post.description,
        user: this.props.user.username,
        category: this.props.categories[0].category,
        quantity: this.props.post.quantity,
        submitted: false
      };
    } else {
      const {
        id,
        name,
        description,
        user,
        category,
        quantity
      } = this.props.post;
      this.state = {
        id,
        name,
        description,
        user,
        category,
        quantity,
        submitted: false
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.id !== this.props.post.id) {
      this.setState(this.props.post);
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getUsers();
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {name, description, user, category, quantity, id} = this.state;
    this.setState({ submitted: true });
    if (this.state.name) {
      this.props.addArticle({name, description, user, category, quantity, id});
      if (this.state.id === false) {
        this.setState({
          id: false,
          name: "",
          description: "",
          user: "",
          category: "",
          quantity: "",
          submitted: false
        });
      }
      this.props.closeModal();
    }
  }

  render() {
    const {users, categories} = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        ref={instance => {
          this.form = instance;
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Nazwa</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {this.state.submitted &&
          !this.state.name && (
            <div className="help-block">Pole obowiązkowe!</div>
          )}
          {users.loading && <em>Loading...</em>}
          {users.items && (
            <React.Fragment>
              <label htmlFor="user">Użytkownik</label>
              <select
                name="user"
                className="form-control"
                id="user"
                value={this.state.user}
                onChange={this.handleChange}
              >
                {users.items.map((user, index) => (
                  <option key={index} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </React.Fragment>
          )}
          {categories && (
            <React.Fragment>
              <label htmlFor="category">Kategoria</label>
              <select
                name="category"
                className="form-control"
                id="category"
                value={this.state.category}
                onChange={this.handleChange}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </React.Fragment>
          )}
          <label htmlFor="quantity">Ilość</label>
          <input
            name="quantity"
            type="text"
            className="form-control"
            id="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Opis</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={e => this.handleSubmit(e)}
          className="btn btn-success btn-lg"
        >
          {this.state.id === false ? "Zapisz" : "Edytuj"}
        </button>
      </form>
    );
  }
}

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(Form);

export {ConnectedForm as Form};
