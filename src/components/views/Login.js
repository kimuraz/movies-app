import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Box, Container, TextField, Label, Text, Button} from 'gestalt';

import {doLogin} from '../../utils/Api';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  _doLogin() {
    if (this.state.email && this.state.password) {
      doLogin(this.state).then(({ data }) => {
        sessionStorage.setItem('token', data.auth_token);
        window.location.href="/movies"
      });
    }
  }

  _linkState(attr) {
    return ({value}) => this.setState({[attr]: value});
  }

  render() {
    return (
      <Container>
        { sessionStorage.getItem('token') && <Redirect to="/movies"/> }
        <Box marginTop={10}>
          <Text align="center" size="xl" color="navy">
            Movies - Login
          </Text>
        </Box>

        <Box marginBottom={3} marginTop={6}>
          <Label htmlFor="email">
            <Text>Email</Text>
          </Label>
        </Box>
        <TextField
          id="email"
          placeholder="Email"
          type="email"
          onChange={this._linkState('email')}
        />

        <Box marginBottom={3} marginTop={3}>
          <Label htmlFor="password">
            <Text>Password</Text>
          </Label>
        </Box>
        <TextField
          id="password"
          placeholder="Password"
          type="password"
          onChange={this._linkState('password')}
        />

        <Box marginTop={3}>
          <Button text="Sign In" color="gray" onClick={() => this._doLogin()}/>
        </Box>
      </Container>
    );
  }
}

export default Login;
