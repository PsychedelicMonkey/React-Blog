import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',

      redirect: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { posts } = this.props.post;

    if (prevProps !== this.props) {
      if (prevProps.post.posts !== posts) {
        this.setState({ redirect: true });
      }
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, content } = this.state;
    this.props.addPost(title, content);
  }

  render() {
    const { role } = this.props.auth.user;
    const { redirect } = this.state;

    if (role !== 'ADMIN' || redirect) {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <h1>New Post</h1>

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="title"
              id="title"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ content: data });
              }}
              config={{
                fillEmptyBlocks: false,
                contentsCss: [''],

                ckfinder: {
                  uploadUrl: '/upload',
                }
              }}
            />
          </FormGroup>

          <Button type="submit" color="primary" block>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(NewPost);
