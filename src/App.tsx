import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Store';

import Entrance from './pages/Entrance';
import RoleDisplay from './pages/RoleDisplay';
import Testing from './pages/test';

function App() {

  //@ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  return (
    <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Entrance/>} />
          <Route path="/roledisplay" render={() => <RoleDisplay/>} />
          <Route path="/test" render={() => <Testing/>} />
        </Switch>
      </Router>
      </Provider>
    </>
  );
}

export default App;

