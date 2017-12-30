import React, { Component } from 'react'
import {selectReadable, fetchReadable} from '../actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import UpvoteReadableView from './UpvoteReadableView'
import DownvoteReadableView from './DownvoteReadableView'
import { NavLink } from 'react-router-dom'
import ReadableEditorView from './ReadableEditorView'
import {readableViewStyles as styles} from './styles/readableViewStyles'

class ReadableView extends Component {
  state = {
    editorOpen: false
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  render() {
    const id=this.props.id
    const author=this.props.readable.author
    const title=this.props.readable.title
    const story=this.props.readable.body
    const category=this.props.readable.category
    return (
      <div>
        <div style={styles.topLineStyle}>
          <div style={styles.titleStyle}>
            {this.props.readable.title} {(this.props.category === 'all') && <span>&#183; </span>}
            {(this.props.category === 'all') && this.props.readableCategoryName}
          </div>
          <div style={styles.editIconStyle}>
            <span style={styles.editLabelStyle}>
              <button
                className={'readable-edit-button'}

                onClick={() => this.openEditor()} style={{borderWidth: '0px'}}>
                Edit
              </button>
            </span>
          </div>
          <div style={styles.headlineStyle}>
            {this.props.readable.author}
            <span> | </span>
            {this.props.readable.timestamp && new Date(
              this.props.readable.timestamp).toDateString()}
            <span> | </span>
            <span style={{whiteSpace: 'nowrap'}}>
              {this.props.readable.commentCount} Comments</span>
            <span> | </span>
            <span style={styles.voteStyle}>
              <span>{this.props.readable.voteScore} votes </span>
              <span aria-label="Up vote" style={{paddingLeft: '4px', paddingRight:'4px'}}>
                <UpvoteReadableView readable={this.props.readable}/> </span>
              <span aria-label="Down vote">
                <DownvoteReadableView readable={this.props.readable}/> </span>
            </span>
          </div>
          <div className="story" style={styles.storyStyle}>
            <NavLink
              style={styles.navlinkStyle}
              activeStyle={styles.navlinkActiveStyle}
              to={{
                pathname: `/posts/${this.props.id}`,
              }}>
              {this.props.readable.body}
            </NavLink>
          </div>
        </div>
        <div style={{display: this.state.editorOpen ? 'block' : 'none', gridColumnStart:'1', gridColumnEnd: '5',
          ...styles.readableEditorViewStyle}}>
          <ReadableEditorView
            id={id}
            author={author}
            title={title}
            story={story}
            category={category}
            close={this.closeEditor}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selectedReadable = ownProps.id
  const readable = ownProps.readable
  const { readableById, allCategories, selectedCategory } = state
  const readableCategoryName = allCategories.items &&
    allCategories.items[readable.category] &&
    allCategories.items[readable.category].name
  return { selectedReadable, readable, readableById, category: selectedCategory, readableCategoryName }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (id) => dispatch(selectReadable(id)),
    fetchReadable: (id) => dispatch(fetchReadable(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableView));

