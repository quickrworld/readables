import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addComment} from '../actions'
import {editComment} from '../actions'

class CommentEditorView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      author: props.author,
      comment: props.story
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
    if(!this.state.author || !this.state.comment) {
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
    if(!this.state.author || !this.state.comment) {
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
    const editorStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingTop: '12px',
      paddingBottom: '24px',
    }
    return (
      <div style={editorStyle}>
        <div style={{
          gridRow: '1',
          gridColumnStart: '1',
          gridColumnEnd: '5',
        }}><span style={{paddingRight: '4px'}}>Comment as </span>
          <input
            type="text"
            onChange={this.handleAuthorChange}
            name={'author'}
            placeholder={'Author'}
            value={this.state.author ? this.state.author : ''}
          />
        </div>
        <div style={{
          gridRow: '2',
          gridColumnStart: '1',
          gridColumnEnd: '5',
          paddingTop: '12px',
          marginRight: '12px'
        }}>
          <textarea
            onChange={this.handleCommentChange} name={'story'} rows={'5'} placeholder={'Your story'}
            value={this.state.comment ? this.state.comment : ''}
            style={{
              border: '1px solid lightgray',
              overflowY: 'auto',
              width: '100%',
              outline: 'none',
              boxShadow: 'none',
              resize: 'none'
            }}>
          </textarea>
        </div>
        <div style={{gridRow:'3', gridColumnStart:'4', justifySelf: 'end', paddingRight: '6px'}}>
          <button
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.props.close}
            style={{display: !this.props.id ? 'none':'default',
              align:'right', borderWidth: '0px'}}>Close</button>
          <button
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.props.id ? this.editComment : this.addComment}
            style={{align:'right', borderWidth: '0px'}}>Comment</button>
        </div>
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
