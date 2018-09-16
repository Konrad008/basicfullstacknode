import { categoryConstants } from "../constants";
import { categoryConnection } from "../../connections";
import { toast } from "react-toastify";

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
  return { type: categoryConstants.ADD, payload: category };
}

function _edit(category) {
  return { type: categoryConstants.EDIT, payload: category };
}

function getAll() {
  return dispatch => {
    return categoryConnection
      .getAll()
      .then(categories => dispatch(_getAll(categories)))
      .catch(err => toast.error(err.toString()));
  };
}

function _delete(id) {
  return dispatch => {
    return categoryConnection
      .delete(id)
      .then(() => dispatch(__delete(id)))
      .catch(err => toast.error(err.toString()));
  };
}

function add(category) {
  return dispatch => {
    return categoryConnection
      .add(category)
      .then(category => dispatch(_add(category)))
      .catch(err => toast.error(err.toString()));
  };
}

function edit(category) {
  return dispatch => {
    return categoryConnection
      .edit(category)
      .then(() => dispatch(_edit(category)))
      .catch(err => toast.error(err.toString()));
  };
}
