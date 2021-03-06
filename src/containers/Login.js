import React from 'react';
import { Link } from 'react-router-dom';
import apiServer from '../config/apiServer';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
  }
  async onSubmit(e) {
    e.preventDefault();
    const url = apiServer + '/api/auth/local/login';
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
        <Link to="/auth/github/callback">Login with GitHub</Link>
      </div>
    );
  }
}

export default Login;
