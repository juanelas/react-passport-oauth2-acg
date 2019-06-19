import React from 'react';
import apiServer from '../config/apiServer';

class LoginGithub extends React.Component {
  componentDidMount() {
    window.open(`${apiServer}/api/auth/github/login/spa`, 'popup')
    this.listener = (ev) => {
      if (ev.origin === apiServer) {
        this.props.setJwt(ev.data.tokenJwt);
      }
    };

    window.addEventListener("message", this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.listener);
  }

  render() {
    return (
      <div className="LoginGithub">
        <p>Connecting with GitHub... Please wait</p>
      </div>
    );
  }
}

export default LoginGithub;
