import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

    alert(JSON.stringify(this.state));
  }

  render() {
    return (
      <Row>
        <Col lg="4" md="8" className="m-auto">
          <Card>
            <CardBody>
              <h1 className="text-center">Log In</h1>

              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </FormGroup>

                <Button type="submit" color="primary" block>Log In</Button>
              </Form>

              <hr></hr>
              <Link to="/signup" className="btn btn-secondary btn-block">Sign Up</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Login;
