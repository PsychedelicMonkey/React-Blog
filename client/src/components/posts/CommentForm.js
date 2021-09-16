import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props;
    const { content } = this.state;
    this.props.addComment(id, content);

    this.setState({ content: '' });
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="content">Share your thoughts</Label>
          <Input disabled={!isAuthenticated}
            type="textarea"
            id="content"
            name="content"
            placeholder="Enter your comment here"
            value={this.state.content}
            onChange={this.onChange}
          />
          {!isAuthenticated ? (
            <FormText>Please log in to leave a comment</FormText>
          ) : null}
        </FormGroup>
        <Button type="submit" color="primary" disabled={!isAuthenticated}>Submit</Button>
        <hr></hr>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
