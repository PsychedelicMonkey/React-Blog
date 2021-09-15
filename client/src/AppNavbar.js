import React, { Component } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './components/auth/Logout';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">Blog</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              {isAuthenticated ? 
                user.role === 'ADMIN' ? (
                  <NavItem>
                    <NavLink tag={Link} to="/posts">New Post</NavLink>
                  </NavItem>
                ) : null
              : null}
            </Nav>
            <Nav className="ml-auto" navbar>
              { isAuthenticated ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>{user.firstName} {user.lastName}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <Logout />
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink tag={Link} to="/login">Log In</NavLink>
                </NavItem>
              ) }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AppNavbar);
