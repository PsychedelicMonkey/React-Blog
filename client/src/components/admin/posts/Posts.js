import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../../../actions/postActions';
import moment from 'moment';

import Loading from '../../Loading';
import DeletePost from './DeletePost';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { user } = this.props.auth;
    const { isLoading, posts } = this.props.post;

    if (user.role !== 'ADMIN') {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <h1>All Posts</h1>
        { posts ? (
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { posts.map(post => (
                <tr key={post._id}>
                  <td>
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                  </td>
                  <td>{post.user.firstName} {post.user.lastName}</td>
                  <td>{moment(post.createdAt).format('MMMM Do YYYY HH:mm:ss A')}</td>
                  <td>
                    <Link to="/" className="btn btn-warning mr-2">Edit</Link>
                    <DeletePost id={post._id} />
                  </td>
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
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
