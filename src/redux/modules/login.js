const LOGIN = 'LOGIN';

const LOGOUT = 'LOGOUT';

export function sendLogin(username, password, response) {
  return {
    type: LOGIN,
    username,
    password,
    response
  };
}

export function sendLogout() {
  return {
    type: LOGOUT
  };
}

export function doLogin(username, password, response) {
  return (dispatch) => dispatch(sendLogin(username, password, response));
}

export function doLogout() {
  return (dispatch) => dispatch(sendLogout());
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
        username: action.username,
        password: action.password,
        profile: {
          name: action.response.name,
          privateReposCount: action.response.total_private_repose,
          publicReposCount: action.response.public_repos,
          followers: action.response.followers,
          avatarUrl: action.response.avatar_url,
          bio: action.response.bio,
          username: action.response.login
        }
      };
    case LOGOUT:
      return { isLoggedIn: false, username: '', password: '' };
    default:
      return state;
  }
}
