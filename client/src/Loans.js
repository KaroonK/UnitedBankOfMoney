import React, { Component } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
class Loans extends Component {


  render() {
    var username = sessionStorage.getItem('username');
    return (
      <div className ="card container-fluid ">
        Loans
        <Accordion>
          <AccordionItem>
              <AccordionItemTitle>
                <h4>Simple title</h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <p>Body content</p>
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


export default Loans
