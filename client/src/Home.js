import React, { Component } from 'react';

class Home extends Component {


  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
      Welcome 
      </div>
    );
  }
}


export default Home
