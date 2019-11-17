import React, { Component } from 'react';
import './styles.css';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      incorrectCredentials: false,
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  sendLogin = async () => {
    const { doLogin } = this.props;
    const { username, password } = this.state;
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + btoa(username + ":" + password),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      doLogin(username, password)
    } else {
      this.setState({
        username: '',
        password: '',
        incorrectCredentials: true,
      });
    }
  }

  render() {
    const { username, password, incorrectCredentials } = this.state;
    return (
      <div className="centered">
        <div className="card">
          <div className="card-header">
            Login to Github
          </div>
          <div className="card-body">
            { incorrectCredentials && <p class="text-danger">Incorrect username or password</p> }
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input id="username" className="form-control" name="username" type="text" placeholder="Username" value={username} onChange={this.handleInput} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" name="password" type="password" placeholder="Password" value={password} onChange={this.handleInput} />
              </div>

              <button type="button" className="btn btn-primary" id="registerButton" onClick={this.sendLogin}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
