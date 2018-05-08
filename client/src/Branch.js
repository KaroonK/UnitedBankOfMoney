import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import axios from 'axios'
const JsonTable = require('ts-react-json-table');

class Branch extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      addressOfBranch:'',
      position:'',
      isLoggedIn: false,
      list: [],
      listAddress: [],
      listEmployees: [],
      listPositions: []
    };
    this.viewBranch = this.viewBranch.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.viewEmployees = this.viewEmployees.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handlePosition = this.handlePosition.bind(this);

  }

  viewBranch(){
    var self = this;
    axios.get('/branch/viewBranch').then(function(result){
      self.setState({list:result});
    });
  }

  handleAddressChange(event){
    this.setState({addressOfBranch: event.target.value});
  }
  handleAddress = event => {
    event.preventDefault();
    var self = this;
    axios.post('/branch/branchAddress',{
      branchAddress: this.state.addressOfBranch
    })
    .then(function(response){
      self.setState({listAddress : response })
      console.log(response);
    })
    .catch(function (error){
      console.log(error);
      alert("Failed to get table.");
    });
  }

  viewEmployees(){
    var self = this;
    axios.get('/branch/viewEmployees').then(function(result){
      self.setState({listEmployees:result});
    });
  }

  handlePositionChange(event){
    this.setState({position: event.target.value});
  }
  handlePosition = event => {
    event.preventDefault();
    var self = this;
    axios.post('/branch/employeePosition',{
      employeePosition: this.state.position
    })
    .then(function(response){
      self.setState({listPositions : response })
      console.log(response);
    })
    .catch(function (error){
      console.log(error);
      alert("Failed to get table.");
    });
  }

  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
        Branch
        <Accordion>
        <AccordionItem onClick={this.viewBranch}>
            <AccordionItemTitle  >
              <div className="center"><h4 >View Branches</h4></div>
            </AccordionItemTitle>
            <AccordionItemBody>
              <JsonTable className="table" rows={this.state.list.data}/>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem >
            <AccordionItemTitle  >
              <div className="center"><h4>Lookup Branch Address </h4></div>
            </AccordionItemTitle>
            <AccordionItemBody>
              <div><form onSubmit={this.handleAddress} >
                <label>
                  <input type="text" value={this.state.branchAddress} onChange={this.handleAddressChange} placeholder="Branch Name"/>
                </label>
                <button type="submit">Lookup</button>
              </form>
                <JsonTable className="table" rows={this.state.listAddress.data}/>
              </div>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem onClick={this.viewEmployees}>
            <AccordionItemTitle  >
              <div className="center"><h4 >View Employees & Information</h4></div>
            </AccordionItemTitle>
            <AccordionItemBody>
              <JsonTable className="table" rows={this.state.listEmployees.data}/>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem >
            <AccordionItemTitle  >
              <div className="center"><h4>Show Employee at Positions</h4></div>
            </AccordionItemTitle>
            <AccordionItemBody>
              <div><form onSubmit={this.handlePosition} >
                <label>
                  <input type="text" value={this.state.employeePosition} onChange={this.handlePositionChange} placeholder="Position"/>
                </label>
                <button type="submit">Lookup</button>
              </form>
                <JsonTable className="table" rows={this.state.listPositions.data}/>
              </div>
            </AccordionItemBody>
        </AccordionItem>
        </Accordion>
      </div>
    );
  }
}


export default Branch
