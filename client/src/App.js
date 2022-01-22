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
import PasteList from './pages/PasteList';
import Profile from './pages/Profile';


function App() {

  return (
    <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/paste/:id' component={Paste} />
          <Route exact path='/paste/raw/:id' component={Raw} />
          <Route exact path='/pastes' component={PasteList} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/404' component={NotFound} />

          <Redirect to='/404' />
        </Switch>
    </Router>
  );
}

export default App;
