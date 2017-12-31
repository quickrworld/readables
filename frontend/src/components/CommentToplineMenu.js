import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sortCommentsNewest, sortCommentsOldest, sortCommentsTopvoted} from '../actions'
import {commentToplineMenuStyles as styles} from './styles/commentToplineMenuStyles'

class CommentToplineMenu extends Component {
  sortNewest = () => {
    this.newest.style.color = 'rgba(0,0,0,.9)'
    this.newest.style.fontWeight = 'bold'
    this.oldest.style.color = 'rgba(128,128,128,.9)'
    this.oldest.style.fontWeight = 'normal'
    this.topvoted.style.color = 'rgba(128,128,128,.9)'
    this.topvoted.style.fontWeight = 'normal'
    this.props.sortNewest()
  }
  sortOldest = () => {
    this.newest.style.color = 'rgba(128,128,128,.9)'
    this.newest.style.fontWeight = 'nornal'
    this.oldest.style.color = 'rgba(0,0,0,0.9)'
    this.oldest.style.fontWeight = 'bold'
    this.topvoted.style.color = 'rgba(128,128,128,.9)'
    this.topvoted.style.fontWeight = 'normal'
    this.props.sortOldest()
  }
  sortTopvoted = () => {
    this.newest.style.color = 'rgba(128,128,128,.9)'
    this.newest.style.fontWeight = 'nornal'
    this.oldest.style.color = 'rgba(128,128,128,.9)'
    this.oldest.style.fontWeight = 'normal'
    this.topvoted.style.color = 'rgba(0,0,0,0.9)'
    this.topvoted.style.fontWeight = 'bold'
    this.props.sortTopvoted()
  }
  render() {
    return (
      <div style={styles.commentTopLineStyle}>
        <div style={styles.sortLineStyle}>
          <span ref={(span) => { this.newest = span }}
                onClick={this.sortNewest}
                style={{cursor: 'pointer'}}>
            Newest</span>
          <span> | </span>
          <span ref={(span) => { this.oldest = span }}
                onClick={this.sortOldest}
                style={{cursor: 'pointer'}}>
            Oldest</span>
          <span> | </span>
          <span ref={(span) => { this.topvoted = span }}
                onClick={this.sortTopvoted}
                style={{cursor: 'pointer'}}>
            Top voted</span>
          <hr/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortNewest: () => dispatch(sortCommentsNewest()),
    sortOldest: () => dispatch(sortCommentsOldest()),
    sortTopvoted: () => dispatch(sortCommentsTopvoted())
  }
}

export default connect(null, mapDispatchToProps)(CommentToplineMenu)
