import React, { Component } from 'react';
import MovieRouter from './MovieRouter';

import './App.css';
import 'gestalt/dist/gestalt.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
        </header>

        <MovieRouter/>
      </div>
    );
  }
}

export default App;
