import React, {Component} from 'react';
import moment from 'moment';
import {Box, Text, IconButton} from 'gestalt';

import CommentForm from './CommentForm';
import {deleteComment} from '../../utils/Api';


class CommentCard extends Component {
  constructor() {
    super();

    this.state = {
      toggleForm: false,
    }
  }

  _deleteComment() {
    window.confirm('Are you sure you want to delete this comment?') &&
    deleteComment(this.props.comment.id).then(() => {
      this.props.loadComments();
    });    
  }

  render() {
    const {toggleForm} = this.state;
    const {comment, loadComments} = this.props;
    return (
      <Box column={8} padding={4} marginTop={4} color="lightGray" shape="rounded">
        <Box display="flex" alignItems="center" justifyContent="between">
          <Box>
            <Text size="xs">Author: {comment.author}</Text>
            <Text size="xs">Created: {moment(comment.created_at).format('LLLL')}</Text>
          </Box>

          <Box display="flex">
            <IconButton size="xs" icon="edit" accessibilityLabel="Edit" iconColor="blue" onClick={() => this.setState({toggleForm: true})}/>
            <IconButton size="xs" icon="cancel" accessibilityLabel="Delete" iconColor="red" onClick={() => this._deleteComment()}/>
          </Box>
        </Box>
        <Box marginTop={3}>
          {!toggleForm && <Text size="lg">{comment.comment}</Text>}

          {toggleForm && <CommentForm comment={comment} postSave={() => this.setState({toggleForm: false}, loadComments())}/>}
        </Box>
      </Box>
    );
  }
}

export default CommentCard;
