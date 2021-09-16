import React, { Component } from 'react';
import {
  Container,
  Media,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import moment from 'moment';
import parse from 'html-react-parser';

import CommentForm from './CommentForm';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getPost(id);
  }

  render() {
    const { post } = this.props.post;

    return (
      <Container className="mt-3 mb-5">
        { post ? (
          <article className="article">
            <header>
              <h2>{post.title}</h2>
              <div className="article-info d-flex align-items-center my-3">
                <img src={post.user.image} alt="" className="img-profile" />
                <h5 className="ml-2">{post.user.firstName}</h5>
              </div>
              <p>{moment(post.createdAt).format('MMM Do YYYY')}</p>
            </header>
            <div className="content">
              {parse(post.content)}
            </div>
            <section className="comments">
              <h3>Comments</h3>
              <CommentForm id={post._id} />
              { post.comments.length > 0 ? post.comments.map(comment => (
                <Media className="mt-4 mb-5">
                  <Media left>
                    <img src={comment.user.image} alt="" className="img-comment mr-4" />
                  </Media>
                  <Media body>
                    <Media heading>{comment.user.firstName} {comment.user.lastName}</Media>
                    <p>{moment(comment.createdAt).fromNow()}</p>
                    {comment.content}
                  </Media>
                </Media>
              )) : (
                <p>This post has no comments</p>
              )}
            </section>
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
