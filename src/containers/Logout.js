import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {

  componentDidMount() {
    this.props.setJwt(null);
  }

  render() {
    return (
      <Redirect to="/login" />
    )
  }
}

export default Logout;
