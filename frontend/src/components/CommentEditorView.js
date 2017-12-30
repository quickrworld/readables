import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addComment} from '../actions'
import {editComment} from '../actions'
import {commentEditorViewStyles as styles} from './styles/commentEditorViewStyles'

class CommentEditorView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      author: props.author,
      comment: props.story,
      errorMessage: ''
    }
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
  handleAuthorChange = (event) => {
    this.setState({author: event.target.value})
  }
  handleCommentChange = (event) => {
    this.setState({comment: event.target.value})
  }
  addComment = () => {
    if (!this.state.author || !this.state.comment) {
      let errorMessage = ''
      if(!this.state.author) {
        errorMessage = errorMessage + 'Author is required.'
      }
      if(!this.state.comment) {
        errorMessage = `${errorMessage} Comment is required.`
      }
      this.setState({ errorMessage: errorMessage.trim() })
      return
    }
    this.props.addComment({
      readable: this.props.readable,
      author: this.state.author,
      comment: this.state.comment
    })
    this.props.fetchReadable(this.props.readable)
    this.setState({author: '', comment: ''})
    // TODO
    if (this.props.close) {
      this.props.close()
    }
  }
  editComment = () => {
    if (!this.state.author || !this.state.comment) {
      let errorMessage = ''
      if(!this.state.author) {
        errorMessage = errorMessage + 'Author is required.'
      }
      if(!this.state.comment) {
        errorMessage = `${errorMessage} Comment is required.`
      }
      this.setState({ errorMessage: errorMessage.trim() })
      return
    }
    this.props.editComment({
      id: this.props.id,
      readable: this.props.readable,
      author: this.state.author,
      comment: this.state.comment
    })
    // test code
    if (this.props.close) {
      this.props.close()
    }
  }
  render() {
    return (
      <div style={styles.editorStyle}>
        <div style={{gridRow: '1', gridColumnStart: '1', gridColumnEnd: '5'}}>
          <span style={styles.commentLabelStyle}>Comment as </span>
          <input
            type="text"
            disabled={!!this.state.id}
            onChange={this.handleAuthorChange}
            name={'author'}
            placeholder={'Author'}
            value={this.state.author ? this.state.author : ''}
          />
        </div>
        <div style={{gridRow: '2', gridColumnStart: '1', gridColumnEnd: '5', ...styles.textareaStyle, }}>
          <textarea
            onChange={this.handleCommentChange} name={'story'} rows={'5'} placeholder={'Your story'}
            value={this.state.comment ? this.state.comment : ''}
            style={styles.commentStyle}>
          </textarea>
        </div>
        <div style={{gridRow:'3', gridColumnStart:'4', ...styles.buttonRowStyle}}>
          <button
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.props.close}
            style={{...styles.closeButtonStyle,
              display: !this.props.id ? 'none':'default'
            }}>Close</button>
          <button
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.props.id ? this.editComment : this.addComment}
            style={styles.commentButtonStyle}>Comment</button>
        </div>
        {this.state.errorMessage &&
        <div style={{gridRow: '3', gridColumnStart: '1', ...styles.errorMessageStyle}}>
          {this.state.errorMessage}
          {this.state.errorMessage &&
          <button
            style={styles.errorButtonStyle}
            onClick={() => this.setState({errorMessage: ''})}>&#x24e7;</button>}
        </div>}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    editComment: (data) => dispatch(editComment(data))
  }
}

export default connect(null, mapDispatchToProps)(CommentEditorView)
