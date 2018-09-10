import { categoryConstants } from "../constants";
import { alertActions } from "./alert.actions";
import { categoryConnection } from "../../connections";

export const categoryActions = {
  getAll,
  _delete,
  editShow,
  clear,
  add,
  edit
};

function _getAll(categories) {
  return { type: categoryConstants.GET, payload: categories };
}

function __delete(id) {
  return { type: categoryConstants.DEL, payload: id };
}

function editShow(category) {
  return { type: categoryConstants.EDITSHOW, payload: category };
}

function clear() {
  return { type: categoryConstants.CLEAR };
}


function _add(category) {
  return {type: categoryConstants.ADD, payload: category};
}

function _edit(data) {
  return {type: categoryConstants.EDIT, payload: {id: data.id, category: data.category}}
}

function getAll() {
  return dispatch => {
    return categoryConnection
      .getAll()
      .then(categories => dispatch(_getAll(categories)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  };
}

function _delete(id) {
  return dispatch => {
    return categoryConnection
      .delete(id)
      .then(() => dispatch(__delete(id)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  }
}

function add(category) {
  return dispatch => {
    return categoryConnection
      .add(category)
      .then((category) => dispatch(_add(category)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  }
}

function edit(category) {
  return dispatch => {
    return categoryConnection
      .edit(category)
      .then(() => dispatch(_edit(category)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  }
}