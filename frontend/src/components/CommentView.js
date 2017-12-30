import React, { Component } from 'react'
import UpvoteCommentView from './UpvoteCommentView'
import DownvoteCommentView from './DownvoteCommentView'
import CommentEditorView from './CommentEditorView'
import {deleteComment} from "../actions";
import {connect} from "react-redux";
import { commentViewStyles as styles } from './styles/commentViewStyles'

class CommentView extends Component {
  state = {
    editorOpen: false
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  deleteComment = () => {
    this.props.deleteComment(this.props.comment)
  }
  render() {
    return (
      <div>
        <div style={styles.topLineStyle}>
          <div style={styles.commentHeadingStyle}>
            {this.props.comment && this.props.comment.author && this.props.comment.author}
            <span> | </span>
            {this.props.comment && this.props.comment && new Date(this.props.comment.timestamp).toDateString()}
            <span> | </span>
            <span style={styles.commentVoteLineStyle}><span>
                {this.props.comment &&
                this.props.comment.voteScore} votes </span>
              <span aria-label="Up vote" style={styles.upvoteStyle}>
                <UpvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span>
              <span> </span>
              <span aria-label="Down vote">
                <DownvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span>
            </span>
          </div>
          <div style={styles.buttonRowStyle}>
            <button
              className={'comment-delete-button'}

              style={styles.deleteButtonStyle}
              onClick={() => this.deleteComment()}>
              Delete
            </button>
            <button
              className={'comment-edit-button'}

              style={styles.editButtonStyle}
              onClick={() => this.openEditor()}>
              Edit
            </button>
          </div>
        </div>
        <div className="story" style={styles.commentStoryStyle}>
          {this.props.comment &&
          this.props.comment.body &&
          this.props.comment.body}
        </div>
        <div style={{display: this.state.editorOpen ? 'block' : 'none', ...styles.commentEditorBox}}>
          <CommentEditorView
            id={this.props.comment.id}
            author={this.props.comment.author}
            story={this.props.comment.body}
            readable={this.props.comment.parentId}
            close={this.closeEditor}
          />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(null, mapDispatchToProps)(CommentView)