import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Router>
      </Provider>
    );
  }
}

export default App;
