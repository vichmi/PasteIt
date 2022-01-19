import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation, useHistory } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Paste from './pages/Paste';
import Raw from './pages/Raw';
import {useEffect} from 'react';

import NavBar from './components/NavBar';


function App() {
  return (
    <Router>
        {<NavBar />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/paste/:id' component={Paste} />
          <Route exact path='/paste/raw/:id' component={Raw} />
          <Route exact path='/404' component={NotFound} />

          <Redirect to='/404' />
        </Switch>
    </Router>
  );
}

export default App;
