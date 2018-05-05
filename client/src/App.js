import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import Loans from './Loans';
import Accounts from './Accounts';
import Branch from './Branch';
import Clients from './Clients';
import Collections from './Collections';
import Employees from './Employees';
import Investments from './Investments';

class App extends Component {
  render() {

    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/clients">Clients</Link></li>
            <li><Link to="/accounts">Accounts</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/branch">Branch</Link></li>
            <li><Link to="/loans">Loans</Link></li>
            <li><Link to="/investments">Investments</Link></li>
            <li><Link to="/collections">Collections</Link></li>

          </ul>
       </nav>

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
export default App;
