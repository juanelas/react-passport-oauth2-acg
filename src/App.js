import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import Login from './containers/Login';
import LoginGithub from "./containers/LoginGithub";
import Intranet from './containers/Intranet';
import Logout from './containers/Logout';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: localStorage.getItem('jwt')
        };
    }

    setJwt(token) {
        if (token) {
            localStorage.setItem('jwt', token);
        } else {
            localStorage.removeItem('jwt');
        }
        this.setState({
            jwt: token
        });
    }

    isAuthenticated() {
        return (this.state.jwt) ? true : false;
    }

    render() {
        return (
            <Router>
                <h1>My custom intranet</h1>
                <Link to="/logout">Logout</Link>
                <Switch>
                    <Route path="/login" render={(props) => (
                        this.isAuthenticated() ?
                            (<Redirect to="/" />) :
                            (<Login {...props} setJwt={(token) => this.setJwt(token)} />
                            )
                    )} />
                    <Route path="/logout" component={(props) =>
                        <Logout {...props} setJwt={(token) => this.setJwt(token)}/>
                    }/>
                    <Route path="/auth/github/callback" render={(props) => (
                        this.isAuthenticated() ?
                            (<Redirect to="/" />) :
                            (<LoginGithub {...props} setJwt={(token) => this.setJwt(token)} />
                            )
                    )} />
                    <Route path="/" render={(props) => (
                        this.isAuthenticated() ?
                            (<Intranet {...props} jwt={this.state.jwt} />) :
                            (<Redirect to="/login" />)
                    )} />
                </Switch>
            </Router>
        );
    }
}

export default App;
