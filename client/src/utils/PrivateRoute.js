import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

function PrivateRoute({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
