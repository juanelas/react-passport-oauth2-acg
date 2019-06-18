import React from 'react';

class LoginGithub extends React.Component {
  componentDidMount() {
    this.redirectCallback();
  }

  async redirectCallback() {
    const url = 'https://localhost:8443/api/auth/github/callback' + this.props.location.search;

    const res = await fetch(url, {
      method: 'GET', // or 'PUT'
    }).catch(error => console.error(error));
    if (res.status === 200) {
      const json = await res.json();
      this.props.setJwt(json.jwt);
    }
    else {
      alert('Login incorrect');
    }
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
