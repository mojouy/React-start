import * as types from './actionTypes';
import mockAuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(authorId) {
  return { type: types.DELETE_AUTHOR_SUCCESS, authorId };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return mockAuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteAuthor(authorId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return mockAuthorApi.deleteAuthor(authorId).then(() => {
      if (authorId) dispatch(deleteAuthorSuccess(authorId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return mockAuthorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
