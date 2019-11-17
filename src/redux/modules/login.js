const LOGIN = 'LOGIN';

const LOGOUT = 'LOGOUT';

export function sendLogin(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function sendLogout() {
  return {
    type: LOGOUT,
  };
}

export function doLogin(username, password) {
  return (dispatch) => dispatch(sendLogin(username, password));
}

export function doLogout() {
  return (dispatch) => dispatch(sendLogout());
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, username: action.username, password: action.password };
    case LOGOUT:
      return { isLoggedIn: false, username: '', password: '' };
    default:
      return state;
  }
}
