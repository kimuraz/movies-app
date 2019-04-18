import React, {Component} from 'react';
import {Box, Card, Avatar, Text, Button} from 'gestalt';
import jwt_decode from 'jwt-decode';

class MovieCard extends Component {
  constructor() {
    super();

    this.state = {
      decodedToken: null,
    };
  }

  componentDidMount() {
    this.setState({decodedToken: jwt_decode(sessionStorage.getItem('token'))});
  }

  render() {
    const {movie, editMovie, delMovie} = this.props;
    const {decodedToken} = this.state;
    return (
      <Card
        image={<Avatar name={movie.title} src={movie.cover} />}
        active={true}>
        <Text align="center" bold size="xl" truncate>
          <Box paddingX={3} paddingY={2}>
            {movie.title}
          </Box>
        </Text>
        {!!(decodedToken && decodedToken.user_id === movie.user_id) && <Button
          accessibilityLabel="Edit"
          color="gray"
          text="Edit"
          onClick={() => editMovie(movie)}
        />}
        <Box paddingY={2}>
          <Button
            accessibilityLabel="Delete"
            color="red"
            text="Delete"
            onClick={() => delMovie(movie)}
          />
        </Box>
      </Card>
    );
  }
}

export default MovieCard;
