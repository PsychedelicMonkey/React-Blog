import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';
import moment from 'moment';

import Loading from '../Loading';

class Users extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { user } = this.props.auth;
    const { isLoading, users } = this.props.user;

    if (user.role !== 'ADMIN') {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <h1>Users</h1>
        { users ? (
          <Table striped responsive>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              { users.map(user => (
                <tr>
                  <td className="align-middle"><img src={user.image} alt="" className="img-table" /></td>
                  <td className="align-middle">{user.firstName} {user.lastName}</td>
                  <td className="align-middle">{user.email}</td>
                  <td className="align-middle">{moment(user.createdAt).format('MMMM Do YYYY HH:mm:ss A')}</td>
                </tr>
              )) }
            </tbody>
          </Table>
        ) : isLoading ? (
          <Loading />
        ) : null }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(Users);
