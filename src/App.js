import React, {Component} from 'react';
import {Box, Button} from 'gestalt';
import MovieRouter from './MovieRouter';

import './App.css';
import 'gestalt/dist/gestalt.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          {sessionStorage.getItem('token') && (
            <Box marginRight={2} padding={1}>
              <Button
                size="xs"
                color="white"
                text="Logout"
                onClick={() => {
                  sessionStorage.removeItem('token');
                  window.location.href = '/';
                }}
              />
            </Box>
          )}
        </header>

        <MovieRouter />
      </div>
    );
  }
}

export default App;
