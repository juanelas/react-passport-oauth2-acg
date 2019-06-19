import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

  componentWillMount() {
    this.props.setJwt(null);
  }

  render() {
    return (
      <Redirect to="/login" />
    )
  }
}

export default Login;
