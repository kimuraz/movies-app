import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Box, Card, Avatar, Text, Button} from 'gestalt';
import jwt_decode from 'jwt-decode';

class MovieCard extends Component {

  render() {
    const {movie, editMovie, delMovie} = this.props;
    const decodedToken = jwt_decode(sessionStorage.getItem('token'));
    return (
      <Card
        image={<Avatar name={movie.title} src={movie.cover} />}
        active={true}>
        <Text align="center" bold size="xl" truncate>
          <Box paddingX={3} paddingY={2}>
            {movie.title}
          </Box>
        </Text>

        <Box paddingY={2}>
          <Link to={`/movies/${movie.id}`}>
            <Button
              accessibilityLabel="Delete"
              color="blue"
              text="Details and comments"
            />
          </Link>
        </Box>

        {!!(decodedToken && decodedToken.user_id === movie.user_id) && (
          <Button
            accessibilityLabel="Edit"
            color="gray"
            text="Edit"
            onClick={() => editMovie(movie)}
          />
        )}

        {!!(decodedToken && decodedToken.user_id === movie.user_id) && (
          <Box paddingY={2}>
            <Button
              accessibilityLabel="Delete"
              color="red"
              text="Delete"
              onClick={() => delMovie(movie)}
            />
          </Box>
        )}
      </Card>
    );
  }
}

export default MovieCard;
