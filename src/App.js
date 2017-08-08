import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      mail: null
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.handleSignIn();
  }

  handleSignUp(event) {
    event.preventDefault();
    const c = new PasswordCredential(event.target);
    debugger;

    navigator
      .credentials
      .store(c)
      .catch(() => console.error('Sign Up Failed'));
  }

  handleSignIn(event) {
    if (navigator.credentials) {
      navigator.credentials.get({
        password: true,
        federated: {
          provider: [
            'https://accounts.google.com'
          ]
        },
        mediation: 'silent'
      }).then(c => {
        if (c) {
          debugger;
          this.setState({ user: c.name, mail: c.id });
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }

  handleSignOut() {
    this.setState({ user: null, mail: null });
  }

  isLoggedIn(state) { 
    return state.mail !== null && state.user !== null; 
  }

  render() {
    const user = (
      <div>
        <p>Logged in with: {this.state.mail}, {this.state.user}</p>
      </div>
    );

    const signup = (
      <form className="App-form" id="signup" method="post" onSubmit={this.handleSignUp}>
        <input className="App-formItem" name="email" type="text" autoComplete="username email" placeholder="email" />
        <input className="App-formItem" name="display-name" type="text" autoComplete="name" placeholder="name" />
        <input className="App-formItem" name="password" type="password" autoComplete="new-password" placeholder="password" />
        <input className="button" type="submit" value="Sign Up!" />
      </form>
    );

    return (
      <div className="App">
        <div className="App-header">
          <h2>Credential Management Api</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="App-content">
          { this.isLoggedIn(this.state) 
              ? user
              : signup
          }
        </div>
        <div className="App-footer">
          { this.isLoggedIn(this.state) 
              ? <button className="button" type="button" id="signout" onClick={this.handleSignOut}>Sign Out!</button>
              : <button className="button" type="button" id="signin" onClick={this.handleSignIn}>Sign In!</button>
          }
        </div>
      </div>
    );
  }
}

export default App;
