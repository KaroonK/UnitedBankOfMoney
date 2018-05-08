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
    };
    this.viewInvestments = this.viewInvestments.bind(this);
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
                <JsonTable className="table" rows={this.state.list.data} columns={"Button"}/>
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
        </Accordion>
      </div>
    );
  }
}


export default Investments
