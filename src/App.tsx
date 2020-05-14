import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Entrance from './pages/Entrance';

function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" render={() => <Entrance authUser={authUser} setAuthUser={setAuthUser} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

