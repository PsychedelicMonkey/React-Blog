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
import { deleteComment } from '../../actions/postActions';

class DeleteComment extends Component {
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

    const { postId, commentId } = this.props;
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { isOpen } = this.state;
    
    return (
      <Fragment>
        <Button onClick={this.toggle} color="danger">Delete</Button>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Comment</ModalHeader>
          <ModalBody>
            <h3>
              <strong>WARNING</strong>
            </h3>
            <p>You will not be able to recover this comment once its deleted.</p>
            <p>Are you sure you want to delete this comment?</p>
          </ModalBody>
          <ModalFooter>
            <Form onSubmit={this.onSubmit}>
              <Button type="submit" color="danger">Delete Comment</Button>
            </Form>
            <Button onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { deleteComment })(DeleteComment);
