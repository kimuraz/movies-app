import React, {Component} from 'react';
import {
  Modal,
  Box,
  Text,
  TextField,
  Label,
  TextArea,
  Button,
} from 'gestalt';

import {newMovie, editMovie} from '../../utils/Api';

class MovieForm extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      summary: '',
      cover: '',
    };
  }

  componentDidMount() {
    this.props.movie && this.setState({...this.props.movie});
  }

  saveMovie() {
    if (this.props.movie) {
      editMovie(this.state.id, this.state)
        .then(() => {
          this.props.toggleForm();
        })
        .catch(() => {
          alert('Error while editing this movie, try again.');
        });
    } else {
      newMovie(this.state)
        .then(() => {
          this.props.toggleForm();
        })
        .catch(() => {
          alert('Error while creating this movie, try again.');
        });
    }
  }

  _linkState(attr) {
    return ({value}) => this.setState({[attr]: value});
  }

  render() {
    const {title, summary, cover} = this.state;
    return (
      <Modal
        accessibilityCloseLabel="close"
        accessibilityModalLabel="View default padding and styling"
        heading={title || 'New Movie'}
        onDismiss={() =>
          window.confirm('Do you really want to leave?') &&
          this.props.toggleForm()
        }
        size="md">
        <Box padding={3}>
          <Box marginBottom={2}>
            <Label htmlFor="title">
              <Text>Title</Text>
            </Label>
          </Box>
          <TextField
            id="title"
            placeholder="Title"
            onChange={this._linkState('title')}
            value={title}
          />

          <Box marginBottom={2}>
            <Label htmlFor="summary">
              <Text>Sinopse</Text>
            </Label>
          </Box>
          <TextArea
            id="summary"
            rows={3}
            placeholder="Sinopse"
            onChange={this._linkState('summary')}
            value={summary}
          />

          <Box column={12} display="flex" padding={1} alignItems="center">
            <Box column={9}>
              <Box marginBottom={2}>
                <Label htmlFor="cover">
                  <Text>Link for Cover Image</Text>
                </Label>
              </Box>
              <TextField
                id="cover"
                placeholder="Cover Link"
                onChange={this._linkState('cover')}
                value={cover}
              />
            </Box>
          </Box>

          <Box marginBottom={2} marginTop={3}>
            <Button text="Save" onClick={() => this.saveMovie()} />
          </Box>
        </Box>
      </Modal>
    );
  }
}

export default MovieForm;
