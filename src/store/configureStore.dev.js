import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import ReduxThunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer, /* preloadedState, */
    initialState,
    compose(
      applyMiddleware(ReduxThunk, reduxImmutableStateInvariant()),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
