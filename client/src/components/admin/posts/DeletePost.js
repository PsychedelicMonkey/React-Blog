import React, { Component, Fragment } from 'react';
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/postActions';

class DeletePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props;
    this.props.deletePost(id);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <Button onClick={this.toggle} color="danger">Delete</Button>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Post</ModalHeader>
          <ModalBody>
            <h3>
              <strong>WARNING:</strong>
            </h3>
            <p>Pressing delete will delete this post and all comments associated with it.</p>
            <h5>You cannot recover this post once its deleted</h5>
            <p>Are you sure you want to delete this post?</p>
          </ModalBody>
          <ModalFooter>
            <Form onSubmit={this.onSubmit}>
              <Button type="submit" color="danger">Delete Post</Button>
            </Form>
            <Button onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { deletePost })(DeletePost);
