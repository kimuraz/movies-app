import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Text} from 'gestalt';

import CommentForm from '../comments/CommentForm';
import CommentCard from '../comments/CommentCard';

import {getMovieById, getMovieComments} from '../../utils/Api';
import './Comments.css';

class Comments extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      comments: [],
      toggleForm: false,
    };

    this.loadComments = this.loadComments.bind(this);
  }

  componentDidMount() {
    getMovieById(+this.props.match.params.id).then(({data}) => {
      this.setState({movie: data});
      this.loadComments();
    });
  }

  loadComments() {
      getMovieComments(+this.props.match.params.id).then(({data}) => {
        this.setState({comments: data});
      });
  }

  _linkState(attr) {
    return ({value}) => this.setState({[attr]: value});
  }

  render() {
    const {movie, comments, toggleForm} = this.state;
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
            <Button text="Add comment" color="blue" onClick={() => this._linkState('toggleForm')({value: !toggleForm})}/>
            {toggleForm && <CommentForm comment={{movie_id: movie.id}}/>}

            {comments && (
              <div className="MovieComments">
                {comments.map(c => (
                  <CommentCard comment={c} key={c.id} loadComments={this.loadComments}/>
                ))}
              </div>
            )}
          </Box>
        </div>
      </Box>
    );
  }
}

export default Comments;
