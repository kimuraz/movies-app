import React, {Component} from 'react';
import {Box, Text, Button} from 'gestalt';

import MovieForm from '../movies/MovieForm';

import {getMovies} from '../../utils/Api';

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      toggleForm: false,
      editingMovie: null,
    };
  }

  componentDidMount() {
    getMovies()
      .then(({data}) => {
        this.setState({movies: data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  _newMovie() {
    this.setState({ toggleForm: true, editingMovie: null });
  }

  render() {
    const {movies, toggleForm, editingMovie} = this.state;
    return (
      <Box padding={2}>
        <Box alignItems="end" marginBottom={3}>
          <Button text="New Movie!" color="blue" onClick={() => this._newMovie()}/>
        </Box>

        {!movies.length && <Text>No movies to show you...</Text>}
        {toggleForm && <MovieForm movie={editingMovie} toggleForm={() => this.setState({toggleForm: false})}/>}
      </Box>
    );
  }
}

export default Movies;
