import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './components/views/Login';

class MoviesRouter extends Component {
  render() {
    return (
      <Router>
        <div className="AppContent">
          <Route path="/" exact component={Login}/>
          <Route path="/movies"/>
        </div> 
      </Router>
    )
  }
}

export default MoviesRouter;
