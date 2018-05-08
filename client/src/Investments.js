import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import axios from 'axios';

const JsonTable = require('ts-react-json-table');

class Investments extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      list: []
      listPortfolioAdvisors:[]
    };
    this.viewInvestments = this.viewInvestments.bind(this);
    this.viewPortfolioAdvisors = this.viewPortfolioAdvisors.bind(this);
  }
  viewPortfolioAdvisors(){
    var self = this;
    axios.get('/investments/viewPortfolioAdvisors').then(function(result){
      self.setState({listPortfolioAdvisors:result});
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
        Investments
        <Accordion>
          <AccordionItem onClick={this.viewInvestments}>
              <AccordionItemTitle >
                <h4>Show Investments</h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <JsonTable className="table" rows={this.state.list.data}/>
              </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemTitle>
                <h4>Complex title</h4>
                <div>With a bit of description</div>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <p>Body content</p>
                  </AccordionItemBody>
          </AccordionItem>
          <AccordionItem onClick={this.viewPortfolioAdvisors.data}>
          <AccordionItemTitle>
            <h4>View Portfolio Advisors</h4>
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
