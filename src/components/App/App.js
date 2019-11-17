import React from 'react';
import { useSelector } from 'react-redux';

import LoginScreen from '../LoginScreen';
import GithubBreakdownScreen from '../GithubBreakdownScreen';

const App = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  if (isLoggedIn) {
  }
  return <GithubBreakdownScreen />;
  return <LoginScreen />;
};

export default App;
