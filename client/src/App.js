import React, { Component } from 'react';
import { Link, Route, Switch, withRouter, Redirect } from 'react-router-dom';
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
import Authentication from './Authentication';

  const isAuthenticated = true;
  const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/authentication' />
    )} />
  );

  class App extends Component{
  render() {

    return (
      <div>
      <Switch>
        <Route path="/authentication" component={Authentication}/>
        <SecretRoute exact path="/" component={Home}/>
        <SecretRoute path="/test" component={Test}/>
        <SecretRoute path="/clients" component={Clients}/>
        <SecretRoute path="/accounts" component={Accounts}/>
        <SecretRoute path="/employees" component={Employees}/>
        <SecretRoute path="/branch" component={Branch}/>
        <SecretRoute path="/loans" component={Loans}/>
        <SecretRoute path="/investments" component={Investments}/>
        <SecretRoute path="/collections" component={Collections}/>
        </Switch>
      </div>
      //   <SideNav onSelect={(selected) => {
      //       const url = '/' + selected;
      //       if(selected == "logout"){
      //         this.logOut();
      //       } else {
      //         this.props.history.push(url);
      //       }
      //     }
      //   }
      //   >
      //   <SideNav.Toggle/>
      //   <SideNav.Nav >
      //     <NavItem eventKey="home">
      //         <NavIcon>
      //             <img src={homeImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Home
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="clients">
      //         <NavIcon>
      //             <img src={clientsImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Clients
      //         </NavText>
      //     </NavItem>
      //     <NavItem eventKey="accounts">
      //         <NavIcon>
      //             <img src={accImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Accounts
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="employees">
      //         <NavIcon>
      //             <img src={empImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Employees
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="branch">
      //         <NavIcon>
      //             <img src={branchImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Branch
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="loans">
      //         <NavIcon>
      //             <img src={loansImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Loans
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="investments">
      //         <NavIcon>
      //             <img src={insImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Investments
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="collections">
      //         <NavIcon>
      //             <img src={colImg} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Collections
      //           </NavText>
      //     </NavItem>
      //     <NavItem eventKey="logout" >
      //         <NavIcon>
      //           <img src={logOut} height="30" width="30" ></img>
      //         </NavIcon>
      //         <NavText>
      //           Logout
      //         </NavText>
      //     </NavItem>
      //     </SideNav.Nav>
      //     </SideNav>
      // // <Authentication logmeout={this.state.loggedIn}/>
      // <Switch>
      //   <ProtectedRoute
      //     isAccessible
      //     redirectToPath="/login"
      //     path="/hello"
      //     component={() => <p>Logged in</p>}/>
      //     <Route
      //       path="/login"/>
      //
      // </Switch>

    );
  }
}
export default App;
