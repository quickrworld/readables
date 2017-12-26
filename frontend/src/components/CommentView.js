import React, { Component } from 'react'
import UpvoteCommentView from './UpvoteCommentView'
import DownvoteCommentView from './DownvoteCommentView'
import CommentEditorView from './CommentEditorView'
import {fetchDeleteComment} from "../actions";
import {connect} from "react-redux";
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
    // TODO
    this.props.deleteComment(this.props.comment)
  }
  handleMouseEnter = (event) => {
    event.target.style.backgroundColor = 'rgba(47,61,72,.8)'
    event.target.style.color = 'rgba(255,255,255,.8)'
    event.target.style.borderRadius = '4px'
  }
  handleMouseLeave = (event) => {
    event.target.style.backgroundColor = 'rgb(255,255,255)'
    event.target.style.color = 'rgb(0,0,0)'
    event.target.style.borderRadius = '4px'
  }
  render() {
    const topLineStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px',
    }
    const commentHeadingStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '4',
      color: 'rgb(79, 79, 79)',
      alignContent: 'center',
      paddingTop: '12px'
    }
    const commentVoteLineStyle = {
      whiteSpace: 'nowrap',
      color: 'rgb(79, 79, 79)'
    }
    const editButtonStyle = {
      gridColumnStart: '4',
      gridColumnEnd: '5',
      textAlign: 'right',
      alignContent: 'center',
      paddingTop: '12px'
    }
    const editIconStyle = {
      fontSize: '12pt',
      color: 'rgb(79, 79, 79)'
    }
    const commentStoryStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      padding: '0px 0px 12px 0px',
      fontSize: '14px',
      borderBottom: '1px solid lightgray',
      color: 'rgb(79, 79, 79)'
    }
    return (
      <div>
        <div className="top-line" style={topLineStyle}>
          <div style={commentHeadingStyle}>
            {this.props.comment && this.props.comment.author && this.props.comment.author} |
            {this.props.comment && this.props.comment && new Date(this.props.comment.timestamp).toDateString()} |
            <span style={commentVoteLineStyle}><span>
                {this.props.comment &&
                this.props.comment.voteScore} votes </span>
              <span role={'img'} aria-label="Up vote">
                <UpvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span> <span role={'img'} aria-label="Down vote">
                <DownvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span>
            </span>
          </div>
          <div style={editButtonStyle}>
            <span style={editIconStyle}>
              <span aria-label="Edit comment">
                <button
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  style={{borderWidth: '0px'}}
                  onClick={() => this.deleteComment()}>
                  Delete
                </button>
                <button
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  style={{borderWidth: '0px'}}
                  onClick={() => this.openEditor()}>
                  Edit
                </button>
              </span>
            ︎</span>
          </div>
        </div>
        <div className="story" style={commentStoryStyle}>
          {this.props.comment &&
          this.props.comment.body &&
          this.props.comment.body}
        </div>
        <div style={{marginBottom: '12px', borderBottom: '1px solid lightgray', display: this.state.editorOpen ? 'block' : 'none'}}>
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
    deleteComment: (data) => dispatch(fetchDeleteComment(data))
  }
}

export default connect(null, mapDispatchToProps)(CommentView)