import React, { Component } from 'react';
import { Container, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';

import Loading from './Loading';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { isLoading, posts } = this.props.post;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <h1>Home</h1>
        { posts ? 
          posts.map(post => (
            <div>
              <h2>{post.title}</h2>
              <p>{post.user.firstName}</p>
              <Link to={`/post/${post._id}`}>Read More</Link>
            </div>
          ))
        : null }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Home);
