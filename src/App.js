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
    // Check if we have stored user credentials we can access, 
    // and sign in if so
    this.handleSignIn();
  }

  handleSignUp(event) {
    event.preventDefault();
    // Create a new passordCredential object
    const c = new PasswordCredential(event.target);

    navigator
      .credentials
      // Store the password information in your browser
      .store(c)
      .catch(() => console.error('Sign Up Failed'));
  }

  handleSignIn(event) {
    // Check if your browser supports the credentials api
    if (navigator.credentials) {
      // Try to password informations from your browser
      navigator.credentials.get({
        password: true,
        federated: {
          provider: [
            'https://accounts.google.com'
          ]
        },
        mediation: 'silent' // silent | optional | required
      }).then(c => {
        // Process the User-Credential Data you received just now
        if (c) {
          // Login :)
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
