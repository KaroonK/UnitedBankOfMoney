import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import './styles/Clients.css';
import axios from 'axios';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const defaultOption = '';
const JsonTable = require('ts-react-json-table');

class Clients extends Component {
  constructor(props){
    super(props);
    this.state = {
      ssnNumber: '',
      fullName : '',
      list: [],
      clientBranchList: [],
      dateState: '',
      phNumber: '',
      address : '',
      dlNum : '',
      bNum : '',
      selectedBranch: '',

    };

    this.viewSpecificBranch = this.viewSpecificBranch.bind(this);
    this.handleSSNChange = this.handleSSNChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleLicenseChange = this.handleLicenseChange.bind(this);
    this.handlebNumChange = this.handlebNumChange.bind(this);
    this.viewClientsFromBranch = this.viewClientsFromBranch.bind(this);
    this.selectedB = this.selectedB.bind(this);
    this.updateAddress= this.updateAddress.bind(this);
  }
    selectedB(event){
      this.setState({selectedBranch: event.value});
      this.viewClientsFromBranch(event);
    }
    handleSSNChange(event){
      this.setState({ssnNumber: event.target.value});
    }
    handleClientBranchListChange(event){
      this.setState({clientBranchList: event.value});
    }
    handleFullNameChange(event){
      this.setState({fullName:event.target.value});
    }
    handleDateChange(event){
      this.setState({dateState:event.target.value});
    }
    handlePhoneChange(event){
      this.setState({phNumber:event.target.value});
    }
    handleAddressChange(event){
      this.setState({address:event.target.value});
    }
    handleLicenseChange(event){
      this.setState({dlNum:event.target.value});
    }
    handlebNumChange(event){
      this.setState({bNum:event.target.value});
    }

    viewClientsFromBranch(event){
      var self = this;
      axios.post('/clients/clientsFromBranch',{
        braName: event.value
      })
      .then(function(response){
        self.setState({clientBranchList : response});
      })
      .catch(function(error){
        console.log(error);
        alert("Failed to get clients from branch.");
      })

    }

    viewSpecificBranch(){
      var self = this;
      axios.get('/clients/getBranches').then(function(result){
        self.setState({list:result});
        }
      );

    }
    updateAddress = event => {

      event.preventDefault();
      var self= this;
      axios.post('/clients/updateAddress',{
        ssn: this.state.ssnNumber,
        add: this.state.address,
      })
      .then(function(response){
        if(response.data==true){
          alert("Client's information has been updated!");
        }else {
          alert("Client's information was not updated!");
          self.setState({
            ssnNumber: '',
            address : '',
          });
        }
        })
        .catch(function (error) {
           console.log(error);
       alert("Failed to log in.");
     });
     this.forceUpdate();
    }
    handleSubmit = event => {

      event.preventDefault();
      var self= this;
      axios.post('/clients/addClient',{
        ssn: this.state.ssnNumber,
        fullN: this.state.fullName,
        dateS: this.state.dateState,
        phNum: this.state.phNumber,
        add: this.state.address,
        dlN: this.state.dlNum,
        bN : this.state.bNum
      })
      .then(function(response){
        if(response.data==false){
          alert("Client could not be added due to a SSN match. Please make sure to use the correct SSN.");
        }else {
          alert("Client was added successfully!");
          self.setState({
            ssnNumber: '',
            fullName : '',
            dateState: '',
            phNumber: '',
            address : '',
            dlNum : '',
            bNum : ''
          });
        }
        })
        .catch(function (error) {
           console.log(error);
       alert("Failed to log in.");
     });
     this.forceUpdate();
    }


  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
        <Accordion>
          <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">Add Client to Database</h4>
                <div>Client information cannot be empty</div>
              </AccordionItemTitle>
              <AccordionItemBody>
              <div><form onSubmit ={this.handleSubmit} >
              <label>
                <input type="number" value={this.state.ssnNumber} onChange={this.handleSSNChange} placeholder="12345678" max="999999999" required />
              </label>
              <br/>
              <label>
              <input type='text' value={this.state.fullName} onChange={this.handleFullNameChange} placeholder="Full Name" name='full name'  required/>
              </label>
              <br/>
              <label>
                <input type="date" value={this.state.dateState} onChange={this.handleDateChange} required/>
              </label>
              <br/>
              <label>
                <input type="number" value={this.state.phNumber} onChange={this.handlePhoneChange} placeholder="6 digit Phone Number" required/>
              </label>
              <br/>
              <label>
                <input type="text" value={this.state.address} onChange={this.handleAddressChange} placeholder="Address" required/>
              </label>
              <br/>
              <label>
                <input type="text" value={this.state.dlNum} onChange={this.handleLicenseChange} placeholder="Driver's License Num" required/>
              </label>
              <br/>
              <label>
                <input type="number" value={this.state.bNum} onChange={this.handlebNumChange} placeholder="Home Branch between (1-5)" required/>
              </label>
              <br/>
              <button > Add </button>
              </form>
                <JsonTable className="table" />
              </div>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem onClick={this.viewSpecificBranch}>
              <AccordionItemTitle>
                <h4 className="center">View Clients of a particular branch</h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <Dropdown options={this.state.list.data} onChange={this.selectedB} value={this.state.selectedBranch} placeholder="Select an option"/>
                  <JsonTable rows={this.state.clientBranchList.data} className="table"/>
                  </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">Add Client to Database</h4>
                <div>Client information cannot be empty</div>
              </AccordionItemTitle>
              <AccordionItemBody>
              <div><form onSubmit ={this.updateAdress} >

              <label>
                <input type="number" value={this.state.ssnNumber} onChange={this.handleSSNChange} placeholder="12345678" max="999999999" required />
              </label>
              <br/>
              <label>
                  <input type="text" value={this.state.address} onChange={this.handleAddressChange} placeholder="Address" required/>
                </label>
              <br/>

              <br/>
              <button > Add </button>
              </form>
                <JsonTable className="table" />
              </div>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">UPDATE Client Address</h4>
              </AccordionItemTitle>
              <AccordionItemBody>
              <div><form onSubmit ={this.updateAddress} >

              <label>
                <input type="number" value={this.state.ssnNumber} onChange={this.handleSSNChange} placeholder="12345678" max="999999999" required />
              </label>
              <br/>
              <label>
                  <input type="text" value={this.state.address} onChange={this.handleAddressChange} placeholder="Address" required/>
                </label>
              <br/>

              <br/>
              <button > Update </button>
              </form>
              </div>
              </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}


export default Clients
