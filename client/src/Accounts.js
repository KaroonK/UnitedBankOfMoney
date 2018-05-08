import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import './styles/Accounts.css';
import axios from 'axios';


const JsonTable = require('ts-react-json-table');

class Accounts extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      creditList: [],
      acctNum: '',
      acctType: '',
      currDate: '',
      ssnAccount: '',
      balance: 0.0,
      linkedAccount: '',

    };
    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAcctNum = this.handleAcctNum.bind(this);
    this.handleAcctType= this.handleAcctType.bind(this);
    this.handleCurrDateChange = this.handleCurrDateChange.bind(this);
    this.handleSSNAccountChange = this.handleSSNAccountChange.bind(this);
    this.handleLinkAccount = this.handleLinkAccount.bind(this);
    this.handleViewAllCredit = this.handleViewAllCredit.bind(this);
    this.handleViewAllDebit = this.handleViewAllDebit.bind(this);

  }
  handleAcctNum(event){
    this.setState({acctNum: event.target.value});
  }
  handleAcctType(event){
    this.setState({acctType: event.target.value});
  }
  handleCurrDateChange(event){
    this.setState({currDate: event.target.value});
  }
  handleSSNAccountChange(event){
    this.setState({ssnAccount: event.target.value});
  }
  handleLinkAccount(event){
    this.setState({linkedAccount:event.target.value});
  }
  handleViewAllDebit(event){
    var self = this;
    axios.get('/accounts/viewDebitAccounts').then(function(resultCredit){
      self.setState({creditList: resultCredit});
    })
  };

  handleViewAllCredit(event){
    var self = this;
    axios.get('/accounts/viewCreditAccounts').then(function(resultCredit){
      self.setState({creditList: resultCredit});
    })
  };
  handleViewAll(){
    var self = this;
    axios.get('/accounts/viewAccounts').then(function (result){
      self.setState({list:result});
    })
  };

  handleSubmit = event => {

    event.preventDefault();
    var self= this;
    axios.post('/accounts/createNewAccount',{
      accountNumber: this.state.acctNum,
      accountType: this.state.acctType,
      currentDate: this.state.currDate,
      ssnAcc : this.state.ssnAccount,
    })
    .then(function(response){
      if(response.data==false){
        alert("Could not create the account. Make sure to use an unique account number.");
      }else{
        alert("Account created successfully!");
      }
    })


  }

  handleSubmitCredit = event => {

    event.preventDefault();
    var self= this;
    axios.post('/accounts/createCreditCard',{
      accountNumber: this.state.acctNum,
      accountType: this.state.acctType,
      currentDate: this.state.currDate,
      ssnAcc : this.state.ssnAccount,
    })
    .then(function(response){
      if(response.data==false){
        alert("Could not create the account. Make sure to use an unique Credit Card number as well as the matching SSN for the user.");
      }else{
        alert("Credit Card created successfully!");
        self.setState=({
          acctNum: '',
          acctType: '',
          currDate: '',
          ssnAccount: '',
          balance: 0.0,
          linkedAccount: '',
        });
      }
    });
  }

  handleSubmitDebit = event => {

    event.preventDefault();
    var self= this;
    axios.post('/accounts/createDebitCard',{
      accountNumber: this.state.acctNum,
      accountType: this.state.acctType,
      currentDate: this.state.currDate,
      ssnAcc : this.state.ssnAccount,
      linkedAcc: this.state.linkedAccount
    })
    .then(function(response){
      if(response.data==false){
        alert("Could not create the account. Make sure to use an unique Credit Card number as well as the matching SSN for the user.");
      }else{
        alert("Debit Card created successfully!");
        self.setState=({
          acctNum: '',
          acctType: '',
          currDate: '',
          ssnAccount: '',
          balance: 0.0
        });
      }
    });
  }
handleAccountDelete= event => {

  event.preventDefault();
  var self= this;
  axios.post('/accounts/deleteAccount',{
    accountNumber: this.state.acctNum,
  })
  .then(function(response){
    if(response.data==false){
      alert("Could not delete the account.Please contact the administrator.");
    }else{
      alert("Account deleted successfully!");
      self.setState=({
        acctNum: '',
      });
    }
  });
}

  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
        Accounts
        <Accordion>
          <AccordionItem onClick={this.handleViewAll}>
              <AccordionItemTitle>
                <h4 className="center">View All </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <JsonTable className="table" rows={this.state.list.data}/>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem >
              <AccordionItemTitle>
                  <h4 className="center">Open Account </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
              <form className="AddForm" onSubmit ={this.handleSubmit} >
              <label>Account Number:
                <input type="number" value={this.state.acctNum} onChange={this.handleAcctNum} placeholder="123456" required />
              </label>
              <br/>
              <label>Account Type:
              <input type='text' value={this.state.acctType} onChange={this.handleAcctType} placeholder="Full Name" name='full name'  required/>
              </label>
              <br/>
              <label>Current Date:
                <input type="date" value={this.state.currDate} onChange={this.handleCurrDateChange} placeholder="6 digit Phone Number" required/>
              </label>
              <br/>

              <label>SSN:
                <input type="number" value={this.state.ssnAccount} onChange={this.handleSSNAccountChange} placeholder="Address" required/>
              </label>
              <br/>
              <button > Add </button>
              </form>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem >
              <AccordionItemTitle>
                  <h4 className="center">Open Credit Card Account </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
              <form className="AddForm" onSubmit ={this.handleSubmitCredit} >
              <label>Credit Card Number:
                <input type="number" value={this.state.acctNum} onChange={this.handleAcctNum} placeholder="123456" required />
              </label>
              <br/>
              <label>Credit Card CVV:
              <input type='text' value={this.state.acctType} onChange={this.handleAcctType} placeholder="Full Name" name='full name'  required/>
              </label>
              <br/>
              <label>Credit Card EXP:
                <input type="date" value={this.state.currDate} onChange={this.handleCurrDateChange} placeholder="6 digit Phone Number" required/>
              </label>
              <br/>
              <label>SSN:
                <input type="number" value={this.state.ssnAccount} onChange={this.handleSSNAccountChange} placeholder="Address" required/>
              </label>
              <br/>
              <button > Add </button>
              </form>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem >
              <AccordionItemTitle>
                  <h4 className="center">Open Debit Card Account </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
              <form className="AddForm" onSubmit ={this.handleSubmitDebit} >
              <label>Debit Card Number:
                <input type="number" value={this.state.acctNum} onChange={this.handleAcctNum} placeholder="123456" required />
              </label>
              <br/>
              <label>Debit Card CVV:
              <input type='text' value={this.state.acctType} onChange={this.handleAcctType} placeholder="Full Name" name='full name'  required/>
              </label>
              <br/>
              <label>Debit Card EXP:
                <input type="date" value={this.state.currDate} onChange={this.handleCurrDateChange} placeholder="6 digit Phone Number" required/>
              </label>
              <br/>
              <label> Linked Account:
                <input type="number" value={this.state.linkedAccount} onChange={this.handleLinkAccount} />
              </label>
              <br/>
              <label>SSN:
                <input type="number" value={this.state.ssnAccount} onChange={this.handleSSNAccountChange} placeholder="Address" required/>
              </label>
              <br/>
              <button > Add </button>
              </form>
              </AccordionItemBody>
          </AccordionItem>
          {/*<AccordionItem >
              <AccordionItemTitle>
                  <h4 className="center">Delete Account </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
              <form className="AddForm" onSubmit ={this.handleAccountDelete} >
              <label>Account Number to Close:
                <input type="number" value={this.state.acctNum} onChange={this.handleAcctNum} placeholder="123456" required />
              </label>
              <br/>

              <button > Add </button>
              </form>
              </AccordionItemBody>
          </AccordionItem>*/}
          <AccordionItem onClick={this.handleViewAllCredit}>
              <AccordionItemTitle>
                <h4 className="center">View All Clients with Credit Cards </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <JsonTable className="table" rows={this.state.creditList.data}/>
              </AccordionItemBody>
          </AccordionItem>

          <AccordionItem onClick={this.handleViewAllDebit}>
              <AccordionItemTitle>
                <h4 className="center">View All Clients with Debit Cards </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <JsonTable className="table" rows={this.state.creditList.data}/>
              </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}


export default Accounts
