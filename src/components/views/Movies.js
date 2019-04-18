import React, {Component} from 'react';
import {Box, Text, Button} from 'gestalt';

import MovieForm from '../movies/MovieForm';
import MovieCard from '../movies/MovieCard';

import {getMovies, deleteMovie} from '../../utils/Api';

const styles = {
  flexMovies: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      toggleForm: false,
      editingMovie: null,
    };

    this.editMovie = this.editMovie.bind(this);
    this.delMovie = this.delMovie.bind(this);
    this._loadMovies = this._loadMovies.bind(this);
  }

  componentDidMount() {
    this._loadMovies();
  }

  _loadMovies() {
    getMovies()
      .then(({data}) => {
        this.setState({movies: data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  editMovie(movie) {
    this.setState({editingMovie: movie, toggleForm: true});
  }

  delMovie(movie) {
    const idx = this.state.movies.findIndex(m => m.id === movie.id);
    if (
      idx !== -1 &&
      window.confirm('Do you really want to delete this movie?')
    ) {
      deleteMovie(movie.id)
        .then(() => {
          const newMovieArr = [...this.state.movies];
          newMovieArr.splice(idx, 1);
          this.setState({movies: newMovieArr});
        })
        .catch(err => {
          alert(`Error deleting the movie "${movie.title}", try again.`);
        });
    }
  }

  _newMovie() {
    this.setState({toggleForm: true, editingMovie: null});
  }

  render() {
    const {movies, toggleForm, editingMovie} = this.state;
    return (
      <Box padding={2}>
        <Box alignItems="end" marginBottom={3}>
          <Button
            text="New Movie!"
            color="blue"
            onClick={() => this._newMovie()}
          />
        </Box>

        <div style={styles.flexMovies}>
          {movies &&
            movies.map(m => (
              <Box column={3} key={m.id} margin={12}>
                <MovieCard movie={m} delMovie={this.delMovie} editMovie={this.editMovie} />
              </Box>
            ))}
        </div>

        {!movies.length && <Text>No movies to show you...</Text>}
        {toggleForm && (
          <MovieForm
            movie={editingMovie}
            toggleForm={() =>
              this.setState({toggleForm: false}, this._loadMovies)
            }
          />
        )}
      </Box>
    );
  }
}

export default Movies;
