import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Container,
  Col,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import moment from 'moment';

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
        <Row>
          { posts ? 
            posts.map(post => (
              <Col lg="10" className="mx-auto">
                <Card className="mb-4">
                  <CardImg top width="100%" height="440px" src={post.image} alt="Card image cap" style={{ objectFit: 'cover' }} />
                  <CardBody>
                    <CardTitle tag="h5">{post.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{moment(post.createdAt).format('MMM Do YYYY')}</CardSubtitle>
                    <Link to={`/post/${post._id}`} className="btn btn-secondary mt-3">Read More</Link>
                  </CardBody>
                </Card>
              </Col>
            ))
          : null }
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Home);
