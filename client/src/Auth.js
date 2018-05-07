import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import {Router, Route} from 'react-router';
import axios from 'axios';
import Authentication from './Authentication';

class Auth extends Component{
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      loggedIn : false
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  componentWillUpdate = (prevProps, prevState) => {

    alert("in Auth");
    if(prevProps.shouldLogout === true){
      console.log(prevProps.shouldLogout);
      this.setState({
        shouldLogout: true
      });
    }
  }

  handleUsername(event) {
     this.setState({username: event.target.value});
   }
   handlePassword(event) {
    this.setState({password: event.target.value});
  }
  handleLogout(event){
    alert("parent called me");
    this.setState({loggedIn:false});
  }
  modalCloser = () => {
    this.props.parentMethod();
  }


   handleSubmit = event => {

    event.preventDefault();
    var self= this;
    axios.post('/users/login',{
      userid: this.state.username,
       pass: this.state.password
    })
    .then(function(response){
      self.setState({loggedIn: response.data});
      if(response.data==false){alert("Incorrect Username or Password. Please try again, Jabroni!")}
      else{
        self.modalCloser();
      }
       //alert("Logged In");
    })
    .catch(function (error) {
     alert("Failed to log in.");
   });
  }
  render() {
    const isLoggedIn= this.state.loggedIn;
    return (
      <div>
      { isLoggedIn == false &&
      <div className ="card container-fluid ">
        <div className="card-body">
          <h4 className="card-title">Login</h4>
          <form className="card-text" method="POST" onSubmit={this.handleSubmit}>
            <label>
              UserID:
                <input type = "number" name="userid" onChange={this.handleUsername}/>
            </label>
            <br/>
            <label>
              Password:
                <input type = "password" name="pass" onChange={this.handlePassword}/>
            </label>
            <button type="submit" className="btn btn-success btn-lg">Login</button>
          </form>
        </div>
      </div>
    }
    { isLoggedIn == true &&
      <div>
      <p> Logged In As: {this.state.username}</p>
      <button className="btn btn-success" onClick={this.handleLogout}>Logout</button>
      </div>
    }
    </div>
    );
  }

}
export default Auth;
