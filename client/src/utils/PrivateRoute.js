import React from 'react';
import { Spinner } from 'reactstrap';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : isLoading ? (
          <Spinner />
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
