import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import axios from 'axios';
import './styles/Accounts.css'
const JsonTable = require('ts-react-json-table');

class Loans extends Component {
  constructor(props){
    super(props);
    this.state = {
        loansList: [],
        appNum: '',
        loanType: '',
        appName: '',
        ssnNum: '',
        status:'',
        loanNum: '',
        balance: '',

    };
    this.handleAppNum = this.handleAppNum.bind(this);
    this.handleLoanType = this.handleLoanType.bind(this);
    this.handleAppName = this.handleAppName.bind(this);
    this.handleSSNChange = this.handleSSNChange.bind(this);
    this.viewAllLoans = this.viewAllLoans.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.handleLoanNum = this.handleLoanNum.bind(this);
  }
  handleLoanNum(event){
    this.setState({loanNum: event.target.value});
  }
  handleAppNum(event){
    this.setState({appNum:event.target.value});
  }
  handleLoanType(event){
    this.setState({loanType:event.target.value});
  }
  handleAppName(event){
    this.setState({appName:event.target.value});
  }
  handleSSNChange(event){
    this.setState({ssnNum:event.target.value});
  }

  viewAllLoans(){
    var self = this;
    axios.get('/loans/viewLoans').then(function(result){
      self.setState({loansList:result});
      }
    );

  }

  checkBalance=event =>{
    event.preventDefault();
    var self=this;
    axios.post('/loans/checkBalance',{
      aBalance:this.state.loanNum,
    })
    .then(function(response){
      self.setState({balance:response.data});
      console.log(this.balance);
    })
    .catch(function(error){

    });
  }
  checkStatus = event =>{
    event.preventDefault();
    var self=this;
    axios.post('/loans/checkStatus',{
      aNum:this.state.appNum,
    })
    .then(function(response){
      console.log(response.data);
      self.setState({status: response.data});
    }).catch(function(error){

    });
  }
  handleSubmit = event =>{
    event.preventDefault();
    var self=this;
    axios.post('/loans/applyLoan',{
      aNum: this.state.appNum,
      lType: this.state.loanType,
      aName: this.state.appName,
      ssn: this.state.ssnNum,
    })
    .then(function(response){
      if(response.data==false){
        alert("Cannot apply for a loan at this moment. Please try again later");
      }else{
        alert("Congrats! You have successfully applied for a loan!");
      }
    })
    .catch(function(error){
      alert("Failed to apply for a loan.");
    });

  }

  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
        Loans
        <Accordion>
          <AccordionItem onClick={this.viewAllLoans}>
              <AccordionItemTitle>
                <h4 className="center">View All Loans</h4>

              </AccordionItemTitle>
              <AccordionItemBody>
                <JsonTable rows={this.state.loansList.data} className="table"/>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">Apply for a loan</h4>
                <div className="center">Please make sure the SSN matches exactly to that of customer.</div>
                </AccordionItemTitle>
                <AccordionItemBody>
                <form className="AddForm" onSubmit ={this.handleSubmit} >
                <label>Application Number:
                  <input type="number" value={this.state.appNumber} onChange={this.handleAppNum} placeholder="12345678" max="999999999" required />
                </label>
                <br/>
                <label>Loan Type:
                <input type='text' value={this.state.loanType} onChange={this.handleLoanType} placeholder="Full Name" name='full name'  required/>
                </label>
                <br/>
                <label>Applicant Name:
                  <input type="text" value={this.state.appName} onChange={this.handleAppName} required/>
                </label>
                <br/>
                <label>SSN:
                  <input type="number" value={this.state.ssnNum} onChange={this.handleSSNChange} placeholder="6 digit Phone Number" required/>
                </label>
                <br/>
                <button> Apply </button>
                </form>
                  </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">Check Status of Loan</h4>
                <div className="center"></div>
                </AccordionItemTitle>
                <AccordionItemBody>
                <form className="AddForm" onSubmit ={this.checkStatus} >
                <label>Application Number:
                  <input type="number" value={this.state.appNum} onChange={this.handleAppNum} placeholder="12345678" max="999999999" required />
                </label>
                <br/>

                <button> Check </button>
                </form>
                <p> STATUS: {this.state.status}</p>
                  </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemTitle>
                <h4 className="center">Check Remaining Balance of Loan</h4>
                <div className="center"></div>
                </AccordionItemTitle>
                <AccordionItemBody>
                <form className="AddForm" onSubmit ={this.checkBalance} >
                <label>Loan Number:
                  <input type="number" value={this.state.loanNum} onChange={this.handleLoanNum} placeholder="12345678" max="999999999" required />
                </label>
                <br/>

                <button> Check </button>
                </form>
                <p> Remaining Balance: {this.state.balance}</p>
                  </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}


export default Loans
