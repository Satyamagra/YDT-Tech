import { HashRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import LocalStorage from "../LocalStore/LocalStorage";

const verify = (value) => {
  const user = LocalStorage.getUser();
  if (user) {
    return <Dashboard>
        
    </Dashboard>;
  } else {
    return <Login></Login>;
  }
};
export default class Routemap extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/Registration" component={Register} />
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" render={() => verify()} />
            <Route path="/user/addstudent" render={() => verify()}   />
            <Route path="/user/studentlist" render={() => verify()} />
            <Route path="/user/studentSearch" render={() => verify()} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
