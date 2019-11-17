import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';

const initialState = {
  login: { isLoggedIn: false, username: '', password: '' },
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
