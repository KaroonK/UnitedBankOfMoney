import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import axios from 'axios';
import './styles/Investments.css';


const JsonTable = require('ts-react-json-table');

class Investments extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      list: [],
      netWorthPerson: '',
      listNetWorth: [],
      listPortfolioAdvisors: []
    };
    this.viewInvestments = this.viewInvestments.bind(this);
    this.handlenetWorthChange = this.handlenetWorthChange.bind(this);
    this.handleNetWorth = this.handleNetWorth.bind(this);
    this.viewPortfolioAdvisors = this.viewPortfolioAdvisors.bind(this);
  }

  viewPortfolioAdvisors(){
    var self = this;
    axios.get('/investments/viewPortfolioAdvisors').then(function(result){
      self.setState({listPortfolioAdvisors: result});
    });
  }
  handlenetWorthChange(event){
    this.setState({netWorthPerson: event.target.value});
  }
  handleNetWorth = event => {
    event.preventDefault();
    var self = this;
    axios.post('/investments/checkNetWorth',{
      netWorth: this.state.netWorthPerson
    })
    .then(function(response){
      self.setState({listNetWorth : response })
      console.log(response);
    })
    .catch(function (error){
      console.log(error);
      alert("Failed to get table.");
    });
  }
  viewInvestments(){
    var self = this;
    axios.get(' /investments/viewInvestments').then(function (result){
      self.setState({list:result});
      }
    );

  }


  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
        <Accordion>
          <AccordionItem onClick={this.viewInvestments}>
              <AccordionItemTitle  >
                <div className="center"><h4 >Show Investments</h4></div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <JsonTable className="table" rows={this.state.list.data}/>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem >
              <AccordionItemTitle  >
                <div className="center"><h4>Check Portfolio Net Worth </h4></div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div><form onSubmit={this.handleNetWorth} >
                  <label>
                    <input type="text" value={this.state.netWorth} onChange={this.handlenetWorthChange} placeholder="Full Name"/>
                  </label>
                  <button type="submit"> Search</button>
                </form>
                  <JsonTable className="table" rows={this.state.listNetWorth.data}/>
                </div>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem onClick={this.viewPortfolioAdvisors} >
              <AccordionItemTitle>
                <h4 className="center">View Portfolio Advisors </h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div>
                  <JsonTable className="table" rows={this.state.listPortfolioAdvisors.data}/>
                </div>
              </AccordionItemBody>
          </AccordionItem>

        </Accordion>
      </div>
    );
  }
}


export default Investments
