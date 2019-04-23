import React, {Component} from 'react';
import {Box, Button, Label, Text, TextArea} from 'gestalt';

import {newComment, editComment} from '../../utils/Api';


class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      comment: '',
      error: null,
    }
  }

  componentDidMount() {
    if (this.props.comment) {
      this._linkState('comment')({ value: this.props.comment.comment });
    }
  }

  _getSaveMethod() {
    const {comment} = this.props;
    return comment && comment.id ? editComment : newComment;
  }

  _save() {
    const {postSave} = this.props;
    const {comment} = this.state;
    this._getSaveMethod()({...this.props.comment, comment}).then(() => {
      postSave && postSave();
    });
  }

  _linkState(attr) {
    return ({value}) => this.setState({[attr]: value});
  }

  render() {
    return (
      <Box columns={12}>
        <Box marginTop={5}>
          <Label htmlFor="comment">
            <Text>Comment</Text>
          </Label>
        </Box>

        <TextArea value={this.state.comment} errorMessage={this.state.error} rows={4} onChange={this._linkState('comment')}/>

        <Box marginY={2}>
          <Button text="Save" onClick={() => this._save()}/>
        </Box>
      </Box>
    );
  }
}

export default CommentForm;
