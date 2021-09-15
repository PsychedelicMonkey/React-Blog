import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authActions';
import PrivateRoute from './utils/PrivateRoute';

import AppNavbar from './AppNavbar';
import Home from './components/Home';
import NewPost from './components/posts/NewPost';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }

    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/posts" component={NewPost} />
        </Router>
      </Provider>
    );
  }
}

export default App;
