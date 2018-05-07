import React, { Component } from 'react';
import { Link, Route, Switch, withRouter, Redirect, BrowserRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
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
import './styles/App.css';
import homeImg from './images/home.png';
import clientsImg from './images/clients.png';
import accImg from './images/accounts.png';
import empImg from './images/employee.png';
import branchImg from './images/branch.png';
import loansImg from './images/loans.png';
import insImg from './images/investment.png';
import colImg from './images/collect.png';
import logOut from './images/logOut.png';
import Authentication from './Authentication';


  class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        username: '',
      };
    }
    AuthService = {
      isAuthenticated:false,
      authentication(){
        this.isAuthenticated=true;
      },
      logout(){
        this.isAuthenticated = false;
        sessionStorage.removeItem('username');
      }
    }
    SecretRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.AuthService.isAuthenticated === true
          ? <Component {...props} />
          // : <Redirect to='/authentication' />
          :<Authentication logState={this.AuthService} />

      )} />
    );
  render() {
    var data = sessionStorage.getItem('username');
    var self=this;
    return (
      <div>

        <SideNav onSelect={(selected) => {
            const url = "/" + selected;
            if(selected == "logout"){
              this.AuthService.logout(()=>this.props.history.push('/authentication'))
              this.forceUpdate();
            } else {
              this.props.history.push(url);
            }
          }
        }
        >
        <SideNav.Toggle/>
          <SideNav.Nav >
            <NavItem eventKey="">
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
          <div className="padLeft">
          <Switch>
            <Route path="/authentication" component={Authentication}/>
            <this.SecretRoute exact path="/" component={Home}/>
            <this.SecretRoute path="/test" component={Test}/>
            <this.SecretRoute path="/clients" component={Clients}/>
            <this.SecretRoute path="/accounts" component={Accounts}/>
            <this.SecretRoute path="/employees" component={Employees}/>
            <this.SecretRoute path="/branch" component={Branch}/>
            <this.SecretRoute path="/loans" component={Loans}/>
            <this.SecretRoute path="/investments" component={Investments}/>
            <this.SecretRoute path="/collections" component={Collections}/>
            </Switch>
          </div>
        </div>
    );
  }
}
export default withRouter(App);
