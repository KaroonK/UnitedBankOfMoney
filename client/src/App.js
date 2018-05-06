import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import Loans from './Loans';
import Accounts from './Accounts';
import Branch from './Branch';
import Clients from './Clients';
import Collections from './Collections';
import Employees from './Employees';
import Investments from './Investments';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './styles/icons.css';
import homeImg from './images/home.png';
import clientsImg from './images/clients.png';
import accImg from './images/accounts.png';
import empImg from './images/employee.png';
import branchImg from './images/branch.png';
import loansImg from './images/loans.png';
import insImg from './images/investment.png';
import colImg from './images/collect.png';
import logOut from './images/logOut.png';
import Auth from './Auth';
import Authentication from './Authentication';
import {closeModal} from './Authentication';
var whiteColor = { "White": "#ffffff" };

class App extends Component {
  constructor(props){
    super(props);
    this.state=({
      logoutNow: false
    });
  }

  logOut = () => {
    this.setState({
      logoutNow: true
    });
  }

  render() {

    return (

      <div>
        <SideNav onSelect={(selected) => {
            const url = '/' + selected;
            if(selected == "logout"){
              this.logOut();
            } else {
              this.props.history.push(url);
            }
          }}
        >
        <SideNav.Toggle/>
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
              <NavIcon>
                  <img src={homeImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Home
                </NavText>
          </NavItem>
          <NavItem eventKey="clients">
              <NavIcon>
                  <img src={clientsImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Clients
              </NavText>
          </NavItem>
          <NavItem eventKey="accounts">
              <NavIcon>
                  <img src={accImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Accounts
                </NavText>
          </NavItem>
          <NavItem eventKey="employees">
              <NavIcon>
                  <img src={empImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Employees
                </NavText>
          </NavItem>
          <NavItem eventKey="branch">
              <NavIcon>
                  <img src={branchImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Branch
                </NavText>
          </NavItem>
          <NavItem eventKey="loans">
              <NavIcon>
                  <img src={loansImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Loans
                </NavText>
          </NavItem>
          <NavItem eventKey="investments">
              <NavIcon>
                  <img src={insImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Investments
                </NavText>
          </NavItem>
          <NavItem eventKey="collections">
              <NavIcon>
                  <img src={colImg} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Collections
                </NavText>
          </NavItem>
          <NavItem eventKey="logout" >
              <NavIcon>
                <img src={logOut} height="30" width="30" ></img>
              </NavIcon>
              <NavText>
                Logout
              </NavText>
          </NavItem>
          </SideNav.Nav>
          </SideNav>
          <Authentication logmeout={this.state.logoutNow} parentMethod={this.logOut} />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/test" component={Test}/>
        <Route path="/clients" component={Clients}/>
        <Route path="/accounts" component={Accounts}/>
        <Route path="/employees" component={Employees}/>
        <Route path="/branch" component={Branch}/>
        <Route path="/loans" component={Loans}/>
        <Route path="/investments" component={Investments}/>
        <Route path="/collections" component={Collections}/>
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
