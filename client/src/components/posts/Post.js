import React, { Component } from 'react';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import moment from 'moment';

import parse from 'html-react-parser';

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
