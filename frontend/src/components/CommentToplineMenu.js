import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sortCommentsNewest, sortCommentsOldest, sortCommentsTopvoted} from '../actions'

class CommentToplineMenu extends Component {
  sortNewest = () => {
    this.newest.style.color = 'rgba(0,0,0,.8)'
    this.oldest.style.color = 'rgba(128,128,128,.8)'
    this.topvoted.style.color = 'rgba(128,128,128,.8)'
    this.props.sortNewest()
  }
  sortOldest = () => {
    this.newest.style.color = 'rgba(128,128,128,.8)'
    this.oldest.style.color = 'rgba(0,0,0,0.8)'
    this.topvoted.style.color = 'rgba(128,128,128,.8)'
    this.props.sortOldest()
  }
  sortTopvoted = () => {
    this.newest.style.color = 'rgba(128,128,128,.8)'
    this.oldest.style.color = 'rgba(128,128,128,.8)'
    this.topvoted.style.color = 'rgba(0,0,0,0.8)'
    this.props.sortTopvoted()
  }
  styles = {
    sortLineStyle: {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      cursor: 'pointer'
    },
    commentTopLineStyle: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px'
    }
  }
  render() {
    return (
      <div className="comment-top-line" style={this.styles.commentTopLineStyle}>
        <div style={this.styles.sortLineStyle}>
          <span ref={(span) => { this.newest = span }}
                onClick={this.sortNewest} style={this.styles.sortLinkStyle}>
            Newest</span> | <span ref={(span) => { this.oldest = span }}
                                  onClick={this.sortOldest} style={this.styles.sortLinkStyle}>
            Oldest</span> | <span ref={(span) => { this.topvoted = span }}
                                  onClick={this.sortTopvoted} style={this.styles.sortLinkStyle}>
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
