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
      boxId:'',
      boxNum:'',
      branchNum:'',
      name:'',
      ssn:'',
      boxIdDelete:'',
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
    this.handleBoxIdChange = this.handleBoxIdChange.bind(this);
    this.handleBoxNumChange = this.handleBoxNumChange.bind(this);
    this.handleBranchNumChange = this.handleBranchNumChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSsnChange = this.handleSsnChange.bind(this);
    this.handleDeleteSafeBox = this.handleDeleteSafeBox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

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

  handleBoxIdChange(event){
    this.setState({boxId: event.target.value});
  }
  handleBoxNumChange(event){
    this.setState({boxNum: event.target.value});
  }
  handleBranchNumChange(event){
    this.setState({branchNum: event.target.value});
  }
  handleNameChange(event){
    this.setState({name: event.target.value});
  }
  handleSsnChange(event){
    this.setState({ssn: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;
    axios.post('/branch/addSafeBox',{
      boxId: this.state.boxId,
      boxNum: this.state.boxNum,
      branchNum: this.state.branchNum,
      name: this.state.name,
      ssn: this.state.ssn
    })
    .then(function(response){
      self.setState()
      if(response.data==false){
        alert("Client could not be added due to Box ID Conflict. Please add unique Box ID.");
      }else {
        alert("Client Safety Deposit Box was added successfully!");
        self.setState({
          boxId:'',
          boxNum:'',
          branchNum:'',
          name: '',
          ssn: ''
        });
      }
    })
    .catch(function(error){
      console.log(error);
      alert("Failed to add to table.");
    });
    this.forceUpdate();
  }

  handleDeleteSafeBox(event){
    this.setState({boxIdDelete: event.target.value})
  }
  handleDelete = event => {
    event.preventDefault();
    var self = this;
    console.log(this.state.boxIdDelete);
    axios.post('/branch/deleteSafeBox',{
      boxIdDelete: this.state.boxIdDelete
    })
    .then(function(response){
      if(response.data==false){
        alert("Can't delete Box due to non existent Box ID.")
      }else{
        alert("Safety Deposit Box Removed!");
        self.setState({
          boxIdDelete:''
        });
      }
    })
    .catch(function(error){
      console.log(error);
      alert("Failed to remove from table.");
    });
    this.forceUpdate();
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
        <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">Open Safety Deposit Box</h4>
                <div>Client information cannot be empty</div>
              </AccordionItemTitle>
              <AccordionItemBody>
              <div><form onSubmit ={this.handleSubmit} >
              <label>
                <input type="number" value={this.state.boxId} onChange={this.handleBoxIdChange} placeholder="Box ID" max="999999999" required />
              </label>
              <br/>
              <label>
              <input type='number' value={this.state.boxNum} onChange={this.handleBoxNumChange} placeholder="Box Number"  required/>
              </label>
              <br/>
              <label>
                <input type="number" value={this.state.branchNum} onChange={this.handleBranchNumChange} placeholder="Branch Number" max="5" required/>
              </label>
              <br/>
              <label>
                <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Client Name" required/>
              </label>
              <br/>
              <label>
                <input type="number" value={this.state.ssn} onChange={this.handleSsnChange} placeholder="SSN" required/>
              </label>
              <br/>
              <button > Add </button>
              </form>
                <JsonTable className="table" />
              </div>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem >
              <AccordionItemTitle  >
                <div className="center"><h4>Remove Safety Deposit Box</h4></div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div><form onSubmit={this.handleDelete} >
                  <label>
                    <input type="number" value={this.state.boxIdDelete} onChange={this.handleDeleteSafeBox} placeholder="Box ID"/>
                  </label>
                  <button type="submit">Remove</button>
                </form>
                  <JsonTable className="table" />
                </div>
              </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}


export default Branch
