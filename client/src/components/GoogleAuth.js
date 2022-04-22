import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


export class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({ // Initializing
                clientId: "872322664986-9t6arn4ldahlq81nqidsno4drek435ds.apps.googleusercontent.com",
                scope: "email"
            })
            .then(() => {
              this.auth = window.gapi.auth2.getAuthInstance(); // Getting the Reference to the Auth Library or Objects
              this.onAuthChange(this.auth.isSignedIn.get()); // Refactor because of Redux
              //this.setState({ isSignedIn: this.auth.isSignedIn.get() }) // Updating our component level State
              this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
      };

      onAuthChange = (isSignedIn) => { // This is a CallBack function, Make sure you make it an arrow function so it is Bind to the component
        if (isSignedIn) {
          this.props.signIn(this.auth.currentUser.get().getId());
        }else {
          this.props.signOut();
        }
      };
  
      onSignInClick = () => {
        this.auth.signIn();
      };
  
      onSignOutClick = () => {
        this.auth.signOut();
      };
    
    renderAuthButton() {  // Helper Function
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
              <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
              </button>
            );
        } else {
            return (
              <button onClick={this.onSignInClick} className="ui red google button">
                  <i className="google icon"/>
                  Sign In with Google
              </button>
            );
        }
      };
  
    render() {
      return (
        <div>
          {this.renderAuthButton()}
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
      return { isSignedIn: state.auth.isSignedIn };
  };

  export default connect(mapStateToProps, { signIn,signOut }) (GoogleAuth);
