import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
  }
  async onSubmit(e) {
    e.preventDefault();
    const url = 'https://localhost:8443/api/login';
    var data = { username: this.usernameInput.current.value, password: this.passwordInput.current.value };

    const res = await fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
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
      <div className="Login">
        <p>Please login to proceed</p>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div>
            <label>Username: </label>
            <input type="text" name="username" ref={this.usernameInput} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" ref={this.passwordInput} />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
        <a href="https://localhost:8443/api/login/github">Login with GitHub</a>
      </div>
    );
  }
}

export default Login;
