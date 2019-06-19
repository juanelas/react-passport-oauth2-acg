import React from 'react';

class LoginGithub extends React.Component {
  componentDidMount() {
    this.redirectCallback();
  }

  async redirectCallback() {
    const origin = 'https://localhost:8443';

    window.open(`${origin}/api/login/github`, 'popup')
    this.listener = (ev) => {
      if(ev.origin === origin) {
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
