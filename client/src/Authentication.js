import Modal from 'react-modal';
import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import {Router, Route} from 'react-router';
import axios from 'axios';
import App from './App';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Authentication extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserChange(event){
    this.setState({username: event.target.value});
  }
  handlePassChange(event){
    this.setState({password: event.target.value});
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
        alert("Logged In");
        console.log(self.props);
        self.props.logState.authentication();
      }
    })
    .catch(function (error) {
      console.log(error);
     alert("Failed to log in.");
   });
  }

  render() {
    return(
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          UserID:
          <input type="number" value={this.state.username} onChange={this.handleUserChange}/>
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.handlePassChange}/>
        </label>
        <button type="submit" className="btn btn-success btn-lg">Login</button>
      </form>
    </div>
  );
}
}
export default Authentication;
