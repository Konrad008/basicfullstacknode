import { crudConstants } from "../constants";
import { crudConnection } from "../../connections";
import { alertActions } from "./alert.actions";

export const crudActions = {
  addArticle,
  editArticle,
  editEntry,
  addArticles,
  removeArticle,
  deleteArticle,
  getArticles,
  sendArticles,
  clearForm
};

function clearForm() {
  return { type: crudConstants.CLEAR_FORM };
}

function addArticle(article) {
  clearForm();
  return { type: crudConstants.ADD, payload: article };
}

function editArticle(article) {
  return {
    type: crudConstants.EDIT,
    payload: article
  };
}

function editEntry(article) {
  return {
    type: crudConstants.EDIT_ENTRY,
    payload: article
  };
}

function addArticles(articles) {
  return {
    type: crudConstants.GET,
    payload: articles
  };
}

function removeArticle(id) {
  return {
    type: crudConstants.DEL,
    payload: id
  };
}



function deleteArticle(id) {
  return dispatch => {
    return crudConnection
      .delete(id)
      .then(() => dispatch(removeArticle(id)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  }
}

function getArticles() {
  return dispatch => {
    return crudConnection
      .get()
      .then(data => dispatch(addArticles(data)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  }
}

function sendArticles(article) {
  return dispatch => {
    if (article.id === false) {
      return crudConnection
        .add(article)
        .then(data => dispatch(addArticle(data)))
        .catch(err => dispatch(alertActions.error(err.toString())));
    }
    return crudConnection
      .edit(article)
      .then(() => dispatch(editEntry(article)))
      .catch(err => dispatch(alertActions.error(err.toString())));
  };
}
