import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import lock from './auth0/lock';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
    this.doLogin = this.doLogin.bind(this);

    this.lock.signedInOk = ({profile}) => {
      this.setState({
        isLoggedIn: true,
        profile,
      })
    }
  }

  doLogin() {
    lock
      .showLock()
      .subscribeAuthenticated()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <button id="login" onClick={doLogin}>Login</button>
          <div class="status">{{ isLoggedIn }}</div>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
