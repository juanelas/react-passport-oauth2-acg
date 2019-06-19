import React from 'react';
import { Redirect } from 'react-router-dom';
import jsonwebtoken from 'jsonwebtoken';
import apiServer from '../config/apiServer';

class Intranet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fortune: '',
      jwtPayload: (this.props.jwt) ? this.decodeJwt() : {},
      validToken: true
    };
    if (this.props.jwt) {
      this.fetchPrivateFortune();
    }
  }
  async fetchPrivateFortune() {
    const url = apiServer + '/api/fortune';
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers: {
        'Authorization': 'Bearer ' + this.props.jwt
      }
    }).then((res) => {
      if (res.status === 401) {
        this.setState({
          validToken: false
        })
      } else if (res.status !== 200) {
        throw new Error(res.status)
      }
      res.json().then((json) => {
        this.setState({
          fortune: json.msg
        })
      });
    }).catch(error => {
      console.error(error);
    })
  }

  decodeJwt() {
    let jwt;
    try {
      jwt = jsonwebtoken.decode(this.props.jwt)
    } catch (error) {
      this.setState({
        validToken: false
      });
    }
    return jwt;
  }

  render() {
    if (!this.state.validToken) {
      return (
        <Redirect to="/logout" />
      );
    }
    return (
      <div className="Intranet">
        <p>Wellcome to the intranet, {this.state.jwtPayload.name}!</p>
        <p>The server says: </p>
        <pre>{this.state.fortune}</pre>
      </div>
    );
  }
}

export default Intranet;
