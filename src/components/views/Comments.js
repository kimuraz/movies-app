import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Text} from 'gestalt';

import {getMovieById, getMovieComments} from '../../utils/Api';
import './Comments.css';

class Comments extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      comments: [],
    };
  }

  componentDidMount() {
    getMovieById(+this.props.match.params.id).then(({data}) => {
      this.setState({movie: data});
      getMovieComments(+this.props.match.params.id).then(({comments}) => {
        console.log(comments);
        this.setState({comments: comments});
      });
    });
  }

  render() {
    const {movie, comments} = this.state;
    return (
      <Box columns={12} padding={2}>
        <div className="MovieDetails">
          <Link to="/movies">{'<'} See all movies</Link>

          <Text color="blue">
            <h2>{movie.title}</h2>
          </Text>
          <img className="Cover" src={movie.cover} alt={movie.title}/>

          <h3>Sinopses</h3>
          <br />
          {movie.summary}

          <Box column={12}>
            <h3>Comments</h3>

            {comments && (
              <div className="MovieComments">
                {comments.map(c => (
                  <p>{c.comment}</p>
                ))}
              </div>
            )}

            <Button text="Add comment" color="blue"/>
          </Box>
        </div>
      </Box>
    );
  }
}

export default Comments;
