import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, SET_VIEW } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}



function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function selectedView(state = '1', action) {
  switch (action.type) {
    case SET_VIEW:
      return action.value;
    default:
      return state;
  }
}

function currentFavorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    case ADD_FAVORITE:
      let addedMovieState = state.concat(action.value);
      return addedMovieState;
    case DELETE_FAVORITE:
      let deletedMovieState = state.filter((m) => m !== action.value);
      return deletedMovieState;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}


const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  currentFavorites,
  user,
  selectedView
});


export default moviesApp;