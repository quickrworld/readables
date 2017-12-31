import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  SORT_COMMENTS_NEWEST, SORT_COMMENTS_OLDEST, SORT_COMMENTS_TOPVOTED,
  sortCommentsNewest, sortCommentsOldest, sortCommentsTopvoted
} from '../actions'
import {commentToplineMenuStyles as styles} from './styles/commentToplineMenuStyles'

class CommentToplineMenu extends Component {
  state = {}
  componentDidMount() {
    this.highlightNewest()
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps.order', nextProps.order)
    const sort = nextProps.order ? nextProps.order : SORT_COMMENTS_NEWEST
    this.setState({sort: sort})
    switch(sort) {
      case SORT_COMMENTS_NEWEST:
        this.highlightNewest()
        break
      case SORT_COMMENTS_OLDEST:
        this.highlightOldest()
        break
      case SORT_COMMENTS_TOPVOTED:
        this.highlightTopvoted()
        break
      default:
        this.highlightOldest()
        break
    }
  }
  highlightNewest() {
    this.newest.style.color = 'rgba(0,0,0,.9)'
    this.newest.style.fontWeight = 'bold'
    this.oldest.style.color = 'rgba(128,128,128,.9)'
    this.oldest.style.fontWeight = 'normal'
    this.topvoted.style.color = 'rgba(128,128,128,.9)'
    this.topvoted.style.fontWeight = 'normal'
  }
  highlightOldest() {
    this.newest.style.color = 'rgba(128,128,128,.9)'
    this.newest.style.fontWeight = 'normal'
    this.oldest.style.color = 'rgba(0,0,0,0.9)'
    this.oldest.style.fontWeight = 'bold'
    this.topvoted.style.color = 'rgba(128,128,128,.9)'
    this.topvoted.style.fontWeight = 'normal'
  }
  highlightTopvoted() {
    this.newest.style.color = 'rgba(128,128,128,.9)'
    this.newest.style.fontWeight = 'normal'
    this.oldest.style.color = 'rgba(128,128,128,.9)'
    this.oldest.style.fontWeight = 'normal'
    this.topvoted.style.color = 'rgba(0,0,0,0.9)'
    this.topvoted.style.fontWeight = 'bold'
  }
  sortNewest = () => {
    this.highlightNewest()
    this.props.sortNewest()
  }
  sortOldest = () => {
    this.highlightOldest()
    this.props.sortOldest()
  }
  sortTopvoted = () => {
    this.highlightTopvoted()
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

function mapStateToProps(state) {
  const order = state.commentsByReadable.order
  return { order: order }
}

function mapDispatchToProps(dispatch) {
  return {
    sortNewest: () => dispatch(sortCommentsNewest()),
    sortOldest: () => dispatch(sortCommentsOldest()),
    sortTopvoted: () => dispatch(sortCommentsTopvoted())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentToplineMenu)
