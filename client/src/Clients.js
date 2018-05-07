import React, { Component } from 'react';

class Clients extends Component {


  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
      Clients {username}
      </div>
    );
  }
}


export default Clients
