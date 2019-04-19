import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './components/views/Login';
import Movies from './components/views/Movies';
import Comments from './components/views/Comments';

class MoviesRouter extends Component {
  render() {
    return (
      <Router>
        <div className="AppContent">
          <Route path="/" exact component={Login}/>
          <Route path="/movies" exact component={Movies}/>
          <Route path="/movies/:id" component={Comments} />
        </div> 
      </Router>
    )
  }
}

export default MoviesRouter;
