import { userConstants } from "../constants";
import { userConnection } from "../../connections/";
import { history } from "../../services";
import { toast } from "react-toastify";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userConnection
      .login(username, password)
      .then(user => {
        dispatch(success(user));
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch(failure(err.toString()));
        toast.error(err.toString());
      });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userConnection.logout();
  history.push("/");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userConnection
      .register(user)
      .then(user => {
        dispatch(success());
        history.push("/");
        toast.success("Rejestracja udana! Możesz się teraz zalogować :)");
      })
      .catch(err => {
        dispatch(failure(err.toString()));
        toast.error(err.toString());
      });
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());
    userConnection
      .getAll()
      .then(users => dispatch(success(users)))
      .catch(err => {
        dispatch(failure(err.toString()));
        toast.error(err.toString());
      });
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userConnection
      .delete(id)
      .then(user => dispatch(success(id)))
      .catch(err => {
        dispatch(failure(err.toString()));
        toast.error(err.toString());
      });
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
