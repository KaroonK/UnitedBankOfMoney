import Modal from 'react-modal';
import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import {Router, Route} from 'react-router';
import axios from 'axios';
import App from './App';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './styles/Authentication.css';
import logo from './images/logo.PNG';

class Authentication extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
      formVisible: 'visible'
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
        self.forceUpdate();
        self.setState({formVisible: 'hidden'});
        sessionStorage.setItem('username', self.state.username);
        sessionStorage.setItem('isLogged', self.state.loggedIn);
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
    <div className='login-Page'>
      <div style={{visibility:this.state.formVisible}} className='form'>
      <img src={logo} width="100%" height="100%" className="logoClass"/>
      <form onSubmit={this.handleSubmit} className='login-form' >
        <label>
          <input type="number" value={this.state.username} onChange={this.handleUserChange} placeholder="User ID"/>
        </label>
        <label>
          <input type="password" value={this.state.password} onChange={this.handlePassChange} placeholder="Password"/>
        </label>
        <button type="submit"> Login</button>
      </form>
      </div>
    </div>
  );
}
}
export default Authentication;
