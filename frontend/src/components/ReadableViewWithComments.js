import React, { Component } from 'react'
import {selectReadable, fetchReadable, deleteReadable} from "../actions"
import {NavLink} from 'react-router-dom'
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import CommentsListView from './CommentsListView'
import UpvoteReadableView from './UpvoteReadableView'
import DownvoteReadableView from './DownvoteReadableView'
import CommentEditorView from './CommentEditorView'
import ReadableEditorView from './ReadableEditorView'

class ReadableViewWithComments extends Component {
  componentDidMount() {
    const id = this.props.id
    if(id) {
      this.props.selectReadable(id)
      this.props.fetchReadable(id)
    }
  }
  state = {
    editorOpen: false
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  handleMouseEnter = (event) => {
    event.target.style.backgroundColor = 'rgba(47,61,72,.8)'
    event.target.style.color = 'rgba(255,255,255,.8)'
    event.target.style.borderRadius = '4px'
  }
  handleMouseEnterDelete = (event) => {
    event.target.style.backgroundColor = 'rgba(255,0,0,.8)'
    event.target.style.color = 'rgba(255,255,255,.8)'
    event.target.style.borderRadius = '4px'
  }
  handleMouseLeave = (event) => {
    event.target.style.backgroundColor = 'rgb(255,255,255)'
    event.target.style.color = 'rgb(0,0,0)'
    event.target.style.borderRadius = '4px'
  }
  deleteReadable = () => {
    this.props.deleteReadable(this.props.id)
  }
  render() {
    const topLineStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px',
    }
    const titleStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      fontSize: '18px',
      color: 'rgb(79, 79, 79)'
    }
    const editIconStyle = {
      fontSize: '12pt',
      color: 'rgb(79, 79, 79)',
      borderWidth: '0px'
    }
    const voteStyle = {
      whiteSpace: 'nowrap',
      color: 'rgb(79, 79, 79)'
    }
    const headlineStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      color: 'rgb(79, 79, 79)'
    }
    const storyStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      padding: '12px 0px 12px 0px',
      fontSize: '14px',
      borderBottom: '1px solid lightgray',
      color: 'rgb(79, 79, 79)'
    }
    if(this.props.deleted === true) {
      return <div
        style={{
          border: '1px solid lightgray',
          margin: '20px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: 'rgba(0,0,0,0.5) 0px 2px 4px 0px'}}>
        <p style={{fontSize:'20px'}}>{`Readable with id '${this.props.id}' has been deleted`}</p>
        <p><span>You could </span>
          <span>
            <NavLink to={{pathname: '/'}}
              style={{textDecoration: 'none', color: 'rgba(47,61,72,1)'}}
              activeStyle={{textDecoration: 'none'}}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}>browse other readables
            </NavLink>
          </span>
          <span> and comment on them</span></p>
        <p><span>Or you could even </span>
          <span>
            <NavLink to={{pathname: '/'}}
                     style={{textDecoration: 'none', color: 'rgba(47,61,72,1)'}}
                     activeStyle={{textDecoration: 'none'}}
                     onMouseEnter={this.handleMouseEnter}
                     onMouseLeave={this.handleMouseLeave}>write your own
            </NavLink>
          </span>
        </p>      </div>
    }
    if (this.props.check === '404') {
      return <div
        style={{
          border: '1px solid lightgray',
          margin: '20px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: 'rgba(0,0,0,0.5) 0px 2px 4px 0px'}}>
        <p style={{fontSize:'20px'}}>{`Readable with id '${this.props.id}' not found`}</p>
        <p><span>You could </span>
          <span>
            <NavLink to={{pathname: '/'}}
              style={{textDecoration: 'none', color: 'rgba(47,61,72,1)'}}
              activeStyle={{textDecoration: 'none'}}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}>browse other readables
            </NavLink>
          </span>
          <span> and comment on them</span>
        </p>
        <p><span>Or you could even </span>
          <span>
            <NavLink to={{pathname: '/'}}
                 style={{textDecoration: 'none', color: 'rgba(47,61,72,1)'}}
                 activeStyle={{textDecoration: 'none'}}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>write your own
            </NavLink>
          </span>
        </p>
      </div>
    }
    return (
      <div>
        <div className="top-line" style={topLineStyle}>
          <div style={titleStyle}>
            {this.props.title}
          </div>
          <div style={{
            gridColumnStart: '2',
            gridColumnEnd: '3',
            textAlign: 'right',
            alignContent: 'center'}}>
            <span style={editIconStyle}>
              <button
                onMouseEnter={this.handleMouseEnterDelete}
                onMouseLeave={this.handleMouseLeave}
                onClick={() => this.deleteReadable()}
                style={{borderWidth: '0px'}}>
                Delete
              </button>
              <button
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={() => this.openEditor()}
                style={{borderWidth: '0px'}}>
                Edit
              </button>
            </span>
          </div>
          <div style={headlineStyle}>
            {this.props.author} |
            {new Date(this.props.timestamp).toDateString()} | <span style={{whiteSpace: 'nowrap'}}>{this.props.commentCount} Comments</span> |
            <span style={voteStyle}><span>{this.props.voteScore} votes </span>
              <span aria-label="Up vote">
                <UpvoteReadableView readable={this.props.readable}/>
              </span> <span aria-label="Down vote">
                <DownvoteReadableView readable={this.props.readable}/>
              </span>
            </span>
          </div>
          <div className="story" style={storyStyle}>
            {this.props.body}
          </div>
          <div style={{
            display: this.state.editorOpen ? 'block' : 'none',
            gridColumnStart:'1', gridColumnEnd: '5', borderBottom: '1px solid lightgray', marginBottom: '12px'}}>
            <ReadableEditorView
              id={this.props.id}
              author={this.props.author}
              category={this.props.category}
              title={this.props.title}
              story={this.props.body}
              readable={this.props.readable}
              close={this.closeEditor}/>
          </div>
        </div>
        <div style={{gridRow:'2', gridColumnStart:'1', gridColumnEnd:'3'}}>
          <CommentEditorView readable={this.props.id} fetchReadable={this.props.fetchReadable}/>
        </div>
        <CommentsListView selectedReadable={this.props.id}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.id
  const {readableById} = state
  const title = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.title
  const author = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.author
  const category = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.category
  const timestamp = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.timestamp && new Date(
      readableById[id].readable.timestamp).toDateString()
  const commentCount = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.commentCount
  const voteScore = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.voteScore
  const body = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.body
  const deleted = readableById &&
    readableById[id] &&
    readableById[id].readable &&
    readableById[id].readable.deleted
  const readable = readableById && readableById[id] && readableById[id].readable
  if(!readable) {
    return { id, check: '404' }
  }
  if(readable && !readable.id) {
    return { id, check: '404' }
  }
  if(deleted) {
    return { id, deleted: true }
  }
  return { id, title, author, category, body, voteScore, commentCount, timestamp, readable, deleted, readableById }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (id) => dispatch(selectReadable(id)),
    fetchReadable: (id) => dispatch(fetchReadable(id)),
    deleteReadable: (id) => dispatch(deleteReadable(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableViewWithComments));

