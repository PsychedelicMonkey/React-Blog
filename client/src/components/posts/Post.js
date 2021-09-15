import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getPost(id);
  }

  render() {
    const { post } = this.props.post;

    return (
      <Container>
        { post ? (
          <article>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        ) : null }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
